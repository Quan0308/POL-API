import { Module, forwardRef } from '@nestjs/common';
import { FriendRequestController } from './friend-requests.controller';
import { FriendRequestService } from './friend-requests.service';
import { UsersModule } from '../users/users.module';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    forwardRef(() => UsersModule),
  ],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
  exports: [FriendRequestService],
})
export class FriendRequestModule {}
