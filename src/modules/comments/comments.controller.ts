import { Controller, Post, Body, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/dto';
import { TransformationInterceptor } from 'src/ultils/response';

@Controller('comments')
@UseInterceptors(TransformationInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body(ValidationPipe) createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }
}
