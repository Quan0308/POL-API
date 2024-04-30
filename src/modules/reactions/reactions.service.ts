import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from 'src/dto';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from 'src/ultils/enums/notification-type.enum';
@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    private readonly notificationService: NotificationService
  ) {}

  async create(reaction: CreateReactionDto) {
    try {
      const newReaction = this.reactionRepository.create({
        ...reaction,
      });
      await this.reactionRepository.save(newReaction);
      const { postId, authorId } = reaction;
      const { post } = await this.reactionRepository.findOne({ where: { postId }, relations: ['post'] });
      const sender = await this.reactionRepository.findOne({ where: { authorId }, relations: ['author'] });
      await this.notificationService.pushNotification({
        receiverId: post.authorId,
        content: 'Sent a reaction',
        title: sender.author.username,
        type: NotificationTypeEnum.REACTION,
        data: {
          avatar: sender.author.avatar,
          emoji: reaction.type,
          type: NotificationTypeEnum.REACTION,
        }
      });
      return null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async getReactionsByPostId(postId: number) {
    return this.reactionRepository
      .createQueryBuilder('reaction')
      .select(['reaction.type', 'reaction.createdAt'])
      .leftJoin('reaction.author', 'author')
      .addSelect(['author.avatar', 'author.username', 'author.id'])
      .where('reaction.postId = :postId', { postId })
      .orderBy('reaction.createdAt', 'DESC')
      .getMany();
  }
}
