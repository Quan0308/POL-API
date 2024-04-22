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
import { ResponseMessage, POST_MESSAGE, TransformationInterceptor, REACTION_MESSAGE } from 'src/ultils/response';
import { CommentsService } from '../comments/comments.service';
import { ReactionsService } from '../reactions/reactions.service';
import { SendReactionDto } from '../../dto/post/send-reaction.dto';

@UseInterceptors(TransformationInterceptor)
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentsService: CommentsService,
    private readonly reactionsService: ReactionsService
  ) {}

  @Get(':postId/comments')
  async getCommentsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.commentsService.getCommentsByPostId(postId);
  }
  @Get(':postId/reactions')
  async getReactionsByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return await this.reactionsService.getReactionsByPostId(postId);
  }
  @Post('created-posts')
  @ResponseMessage(POST_MESSAGE.POST_CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async savePost(@UploadedFile() file, @Body(ValidationPipe) content: CreatePostDto) {
    return await this.postService.create(file, content);
  }
  @Post(':postId/reactions')
  @ResponseMessage(REACTION_MESSAGE.REACTION_CREATED)
  async createReaction(@Param('postId', ParseIntPipe) postId: number, @Body(ValidationPipe) reaction: SendReactionDto) {
    return await this.reactionsService.create({ ...reaction, postId });
  }
}
