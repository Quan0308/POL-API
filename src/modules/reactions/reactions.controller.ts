import { Post, Body, Controller, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { TransformationInterceptor } from 'src/ultils/response';
import { CreateReactionDto } from 'src/dto/reaction/create-reaction.dto';
@Controller('reactions')
@UseInterceptors(TransformationInterceptor)
export class ReactionsController {
    constructor(
        private readonly reactionsService: ReactionsService
    ) {}

    @Post()
    create(@Body(ValidationPipe) createReaction: CreateReactionDto) {
        return this.reactionsService.create(createReaction)
    }

}
