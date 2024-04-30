import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
  Query,
  ParseBoolPipe,
  Optional,
} from '@nestjs/common';
import { OptionalParseBoolPipe } from 'src/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { PostService } from '../posts/post.service';
import { GroupsService } from '../groups/groups.service';
import { CreateUserDto, UpdateUserUsernameDto, UpdateUserPasswordDto } from 'src/dto';
import { ResponseMessage, TransformationInterceptor, USER_MESSAGE } from 'src/ultils/response';
import { NotificationService } from '../notification/notification.service';

@UseInterceptors(TransformationInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postService: PostService,
    private readonly groupService: GroupsService,
    private readonly notificationService: NotificationService
  ) {}

  @Post()
  @ResponseMessage(USER_MESSAGE.USER_CREATED)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/fcm-token')
  @ResponseMessage(USER_MESSAGE.USER_CREATED)
  async saveUserToken(@Param('userId', ParseIntPipe) userId: number, @Body('token') token: string) {
    return await this.notificationService.createOrUpdateFCMToken(userId, token);
  }

  @Get()
  @ResponseMessage(USER_MESSAGE.USER_FETCHED)
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
  @Get(':userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserById(userId);
  }

  @Get(':userId/non-friends')
  async getNonFriendsOfUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getNonFriends(userId);
  }

  @Get(':userId/viewable-posts')
  async getViewablePosts(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('authorId', ParseIntPipe) authorId: number
  ) {
    return await this.postService.getViewablePosts(userId, authorId);
  }

  @Get(':userId/groups')
  async getGroupsOfUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('include-members', OptionalParseBoolPipe) @Optional() includeMembers?: boolean
  ) {
    return await this.groupService.getGroupsOfUser(userId, includeMembers);
  }

  @Get(':userId/friends')
  async getFriendsOfUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUserFriends(userId);
  }

  @Put(':userId/username')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  async updateUsername(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) updateUserUsernameDto: UpdateUserUsernameDto
  ) {
    return await this.usersService.updateUsername(userId, updateUserUsernameDto);
  }

  @Put(':userId/avatar')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile() file: File, @Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.updateAvatar(userId, file);
  }

  @Put(':userId/password')
  @ResponseMessage(USER_MESSAGE.USER_UPDATED)
  async updatePassword(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) updatePasswordDto: UpdateUserPasswordDto
  ) {
    return await this.usersService.updatePassword(userId, updatePasswordDto);
  }

  @Delete(':userId/friend/:friendId')
  @ResponseMessage(USER_MESSAGE.USER_FRIEND_DELETED)
  async deleteFriend(@Param('userId', ParseIntPipe) userId: number, @Param('friendId', ParseIntPipe) friendId: number) {
    return await this.usersService.deleteFriend(userId, friendId);
  }
}
