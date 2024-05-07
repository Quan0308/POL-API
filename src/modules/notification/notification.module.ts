import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../entities/notification.entity';
import { NotificationToken } from 'src/entities/notification-token.entity';
import { FireBaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FireBaseModule, TypeOrmModule.forFeature([Notification, NotificationToken])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
