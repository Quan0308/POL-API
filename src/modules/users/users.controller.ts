import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  ParseIntPipe, 
  ValidationPipe,
  UseInterceptors 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PostService } from '../posts/post.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { 
  ResponseMessage, 
  TransformationInterceptor, 
  USER_MESSAGE 
} from 'src/ultils/response';

@UseInterceptors(TransformationInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService
  ) {}

  @Post()
  @ResponseMessage(USER_MESSAGE.USER_CREATED)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId/viewable-posts')
  async getViewablePosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postService.getViewablePosts(userId);
  }
}
