import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Notification } from 'src/entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationToken } from 'src/entities/notification-token.entity';
import { CreateNotificationDto } from 'src/dto/notification/create-notification.dto';
import { FirebaseService } from '../firebase/firebase.service';
import { INotificationData } from 'src/ultils/interfaces/notificaton-data.interface';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private notificationTokenRepository: Repository<NotificationToken>,
    private readonly firebaseService: FirebaseService
  ) {}

  async createOrUpdateFCMToken(userId: number, token: string) {
    try {
      const notificationToken = await this.notificationTokenRepository.findOne({ where: { userId } });
      if (notificationToken) {
        return await this.notificationTokenRepository.save({
          ...notificationToken,
          token,
        });
      }
      await this.notificationTokenRepository.save({ userId, token });
      return;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async pushNotification(notification: CreateNotificationDto) {
    try {
      const { receiverId, content, title, type, data } = notification;
      const notificationToken = await this.notificationTokenRepository.findOne({ where: { userId: receiverId } });
      await this.notificationRepository.save({
        userId: receiverId,
        notificationTokenId: notificationToken?.id,
        content,
        type,
        data,
      });
      // Send notification to the receiver
      if (notificationToken?.token) {
        await this.firebaseService.pushNotification(notificationToken.token, { title, body: content }, data);
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getNotificationsByUserId(userId: number) {
    try {
      const notifications = await this.notificationRepository.find({
        where: { userId, isRead: false },
        order: { createdOn: 'DESC' },
      });
      if (!notifications.length) return [];

      const grouped = notifications.reduce(
        (acc, notification) => {
          const data = notification.data as unknown as INotificationData;
          const postId = data.postId;
          if (!acc[postId]) {
            acc[postId] = [];
          }
          acc[postId].push(notification);
          return acc;
        },
        {} as Record<string, Notification[]>
      );

      const result = Object.values(grouped)
        .flatMap((group) => group.slice(0, 2))
        .map((notification) => {
          const data = notification.data as unknown as INotificationData;
          return {
            id: notification.id,
            emoji: data.emoji,
            postId: data.postId,
            createdOn: notification.createdOn,
          };
        });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async markAsRead(notificationId: number) {
    try {
      const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
      if (!notification) {
        throw new NotFoundException('Notification not found');
      }
      await this.notificationRepository.save({ ...notification, isRead: true });
      return null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
