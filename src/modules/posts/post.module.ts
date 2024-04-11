import { Module, forwardRef } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { UsersModule } from '../users/users.module';
import { CommentsModule } from '../comments/comments.module';
@Module({
  imports: [
    CommonModule,
    forwardRef(() => UsersModule),
    forwardRef(() => CommentsModule),
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
