import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from 'src/ultils/enums/notification-type.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly notificationService: NotificationService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const { authorId, postId, content } = createCommentDto;
      const newComment = this.commentRepository.create({
        authorId,
        postId,
        content,
      });
      await this.commentRepository.save(newComment);
      
      const post = await this.commentRepository.findOne({ where: { postId }, relations: ['post'] });
      const sender = await this.commentRepository.findOne({ where: { authorId }, relations: ['author'] });
      await this.notificationService.pushNotification({
        receiverId: post.post.authorId,
        content: 'Sent a comment',
        title: sender.author.username,
        type: NotificationTypeEnum.POST,
      });
      return null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getCommentsByPostId(postId: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .select(['comment.content', 'comment.createdAt'])
      .leftJoin('comment.author', 'author')
      .addSelect(['author.avatar', 'author.username'])
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }
}
