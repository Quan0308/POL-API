import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Notification } from 'src/entities/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationToken } from 'src/entities/notification-token.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationToken)
    private notificationTokenRepository: Repository<NotificationToken>
  ) {}

  async createFCMToken(userId: number, token: string) {
    try {
      const notificationToken = this.notificationTokenRepository.create({ userId, token });
      return await this.notificationTokenRepository.save(notificationToken);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
