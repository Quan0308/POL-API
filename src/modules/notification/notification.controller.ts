import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/dto/notification/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
   @Post('push-notification')
    async push(@Body() notification: CreateNotificationDto) {
      return await this.notificationService.pushNotification(notification);
    }
}
