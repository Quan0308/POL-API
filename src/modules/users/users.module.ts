import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PostModule } from '../posts/post.module';
import { CommentsModule } from '../comments/comments.module';
import { GroupsModule } from '../groups/groups.module';
import { CommonModule } from '../common/common.module';
import { FriendRequestModule } from '../friend-requests/friend-requests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommonModule,
    forwardRef(() => PostModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => GroupsModule),
    forwardRef(() => FriendRequestModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
