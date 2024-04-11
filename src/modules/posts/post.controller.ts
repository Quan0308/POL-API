import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from 'src/dto';
import { ResponseMessage, POST_MESSAGE, TransformationInterceptor } from 'src/ultils/response';
import { CommentsService } from '../comments/comments.service';

@UseInterceptors(TransformationInterceptor)
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService
  ) {}

  @Get(':postId/comments')
  async getCommentsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentsService.getCommentsByPostId(postId);
  }
  @Post('created-posts')
  @ResponseMessage(POST_MESSAGE.POST_CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async savePost(@UploadedFile() file, @Body(ValidationPipe) content: CreatePostDto) {
    return await this.postService.create(file, content);
  }
}
