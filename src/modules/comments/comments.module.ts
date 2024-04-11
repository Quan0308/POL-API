import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => PostModule), TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
