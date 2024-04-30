import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Notification } from 'src/entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationToken } from 'src/entities/notification-token.entity';
import { CreateNotificationDto } from 'src/dto/notification/create-notification.dto';
import { FirebaseService } from '../firebase/firebase.service';

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
      // Send notification to the receiver
      if (notificationToken.token) {
        const notification = this.notificationRepository.create({
          userId: receiverId,
          notificationTokenId: notificationToken.id,
          content,
          type,
        });
        await this.notificationRepository.save(notification);
        await this.firebaseService.pushNotification(notificationToken.token, { title, body: content }, data);
      }
      //return await this.notificationRepository.save(notification);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
