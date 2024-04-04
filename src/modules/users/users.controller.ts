import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { PostService } from '../posts/post.service';
import { GroupsService } from '../groups/groups.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
import {
  ResponseMessage,
  TransformationInterceptor,
  USER_MESSAGE,
} from 'src/ultils/response';
import { UpdateUserPasswordDto } from 'src/dto/user/update-password.dto';

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
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserById(userId);
  }

  @Get(':userId/viewable-posts')
  async getViewablePosts(@Param('userId', ParseIntPipe) userId: number) {
    return await this.postService.getViewablePosts(userId);
  }

  @Get(':userId/groups')
  async getGroupsOfUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.groupService.getGroupsOfUser(userId);
  }

  @Patch(':userId/username')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  async updateUsername(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUsername(userId, updateUserDto);
  }

  @Put(':userId/avatar')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile() file: File,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.usersService.updateAvatar(userId, file);
  }

  @Put(':userId/password')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  async updatePassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) updatePasswordDto: UpdateUserPasswordDto,
  ) {
    return await this.usersService.updatePassword(userId, updatePasswordDto);
  }
}
