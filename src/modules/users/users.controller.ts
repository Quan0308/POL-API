import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PostService } from '../posts/post.service';
import { GroupsService } from '../groups/groups.service';
import { CreateUserDto } from 'src/dto';
import {
  ResponseMessage,
  TransformationInterceptor,
  USER_MESSAGE,
} from 'src/ultils/response';

@UseInterceptors(TransformationInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService,
    private readonly groupService: GroupsService,
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

  @Get(':userId/groups')
  async getGroupsOfUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.groupService.getGroupsOfUser(userId);
  }
}
