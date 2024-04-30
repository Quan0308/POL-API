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
        return await this.notificationRepository.save({
          ...notificationToken,
          token,
        });
      }
      const newEntity = this.notificationTokenRepository.create({ userId, token });
      return await this.notificationTokenRepository.save(newEntity);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async pushNotification(notification: CreateNotificationDto) {
    try {
      const { receiverId, content, title, type } = notification;
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
        await this.firebaseService.pushNotification(notificationToken.token, { title, body: content });
      }
      //return await this.notificationRepository.save(notification);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
