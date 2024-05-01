import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from 'src/dto/notification/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
   @Post('push-notification')
    async push(@Body() notification: CreateNotificationDto) {
      return await this.notificationService.pushNotification(notification);
    }

    @Patch(':notificationId')
    async markAsRead(@Param('notificationId', ParseIntPipe) notificationId: number) {
      return await this.notificationService.markAsRead(notificationId);
    }
}
