import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';
import { CreateReactionDto } from 'src/dto';
@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async create(reaction: CreateReactionDto) {
    try {
      const newReaction = this.reactionRepository.create({
        ...reaction,
        createdAt: new Date(),
      });
      return await this.reactionRepository.save(newReaction);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
