import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { Reaction } from 'src/entities/reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction])
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService]
})
export class ReactionsModule {}
