import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    private usersService: UsersService
  ) {}

  async createFriendRequest(senderId: number, receiverId: number) {
    try {
      const senderUser = await this.usersService.getUserById(senderId);
      const receiverUser = await this.usersService.getUserById(receiverId);
      if (!senderUser || !receiverUser) {
        throw new NotFoundException('User not found');
      }
      const isFriend = senderUser.friends.some((friend) => friend.id === receiverId);
      if (isFriend) {
        throw new NotFoundException('You are already friends');
      }
      const friendRequest = this.friendRequestRepository.create({
        senderId,
        receiverId,
        createdAt: new Date(),
      });
      return await this.friendRequestRepository.save(friendRequest);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getFriendRequestsOfReceiver(userId: number) {
    try {
      const requests = await this.friendRequestRepository
        .createQueryBuilder('friend_request')
        .select(['friend_request.createdAt'])
        .leftJoin('friend_request.sender', 'sender')
        .addSelect(['sender.id', 'sender.username', 'sender.avatar'])
        .where('friend_request.receiverId = :receiverId', { receiverId: userId })
        .getMany();
      return requests;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getFriendRequestsOfSender(userId: number) {
    try {
      const requests = await this.friendRequestRepository
        .createQueryBuilder('friend_request')
        .select(['friend_request.createdAt'])
        .leftJoin('friend_request.receiver', 'receiver')
        .addSelect(['receiver.id', 'receiver.username', 'receiver.avatar'])
        .where('friend_request.senderId = :senderId', { senderId: userId })
        .getMany();
      return requests;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteFriendRequest(sender: number, receiver: number) {
    try {
      const request = await this.friendRequestRepository.findOne({
        where: {
          senderId: sender,
          receiverId: receiver,
        },
      });
      return await this.friendRequestRepository.remove(request);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async acceptFriendRequest(sender: number, receiver: number) {
    try {
      const request = await this.friendRequestRepository.findOne({
        where: {
          senderId: sender,
          receiverId: receiver,
        },
      });
      if (!request) {
        throw new NotFoundException('Friend request not found');
      }
      this.usersService.addFriend(sender, receiver);
      this.usersService.addFriend(receiver, sender);
      return await this.deleteFriendRequest(sender, receiver);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
