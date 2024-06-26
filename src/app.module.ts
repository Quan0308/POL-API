import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from 'src/app.service';
import {
  UsersModule,
  PostModule,
  CommentsModule,
  ReactionsModule,
  GroupsModule,
  AuthenticationModule,
  FriendRequestModule,
  NotificationModule,
} from 'src/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from 'src/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { BaseException } from 'src/ultils/exception/base.exception.filter';
import { FireBaseModule } from './modules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    UsersModule,
    PostModule,
    CommentsModule,
    ReactionsModule,
    AuthenticationModule,
    FriendRequestModule,
    GroupsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BaseException,
    },
  ],
})
export class AppModule {}
