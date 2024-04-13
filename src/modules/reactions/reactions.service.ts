import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from 'src/dto';
@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>
  ) {}

  async create(reaction: CreateReactionDto) {
    try {
      const newReaction = this.reactionRepository.create({
        ...reaction,
      });
      return await this.reactionRepository.save(newReaction);
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
