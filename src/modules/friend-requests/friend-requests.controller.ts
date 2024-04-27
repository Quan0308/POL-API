import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseMessage, TransformationInterceptor, FRIEND_REQUEST_MESSAGE } from 'src/ultils/response';
import { FriendRequestService } from './friend-requests.service';
import { CreateFriendRequestDto, DeleteFriendRequestDto } from 'src/dto';

@UseInterceptors(TransformationInterceptor)
@Controller('friend-requests')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Get(':userId')
  async getFriendRequests(@Param('userId', ParseIntPipe) userId: number, @Query('type') type: string) {
    if (type === 'sender') {
      return await this.friendRequestService.getFriendRequestsOfSender(userId);
    } else if (type === 'receiver') {
      return await this.friendRequestService.getFriendRequestsOfReceiver(userId);
    } else {
      throw new BadRequestException('Invalid type. Type must be either "sender" or "receiver".');
    }
  }

  @Post()
  @ResponseMessage(FRIEND_REQUEST_MESSAGE.FRIEND_REQUEST_CREATED)
  async createFriendRequest(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return await this.friendRequestService.createFriendRequest(
      createFriendRequestDto.senderId,
      createFriendRequestDto.receiverId
    );
  }

  @Post('acceptance')
  @ResponseMessage(FRIEND_REQUEST_MESSAGE.FRIEND_REQUEST_ACCEPTED)
  async acceptFriendRequest(@Body() friendRequestDto: CreateFriendRequestDto) {
    return await this.friendRequestService.acceptFriendRequest(friendRequestDto.senderId, friendRequestDto.receiverId);
  }

  @Delete()
  @ResponseMessage(FRIEND_REQUEST_MESSAGE.FRIEND_REQUEST_DELETED)
  async deleteFriendRequest(@Query('senderId') senderId: number, @Query('receiverId') receiverId: number) {
    return await this.friendRequestService.deleteFriendRequest(
      senderId,
      receiverId
    );
  }
}
