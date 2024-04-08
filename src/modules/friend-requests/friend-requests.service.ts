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

  async createFriendRequest(sender: number, receiver: number) {
    try {
      const senderUser = await this.usersService.getUserById(sender);
      const receiverUser = await this.usersService.getUserById(receiver);
      if (!senderUser || !receiverUser) {
        throw new NotFoundException('User not found');
      }
      const friendRequest = this.friendRequestRepository.create({
        sender,
        receiver,
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
        .where('friend_request.receiver = :userId', { userId })
        .getMany();
      const fields = ['user.id', 'user.username', 'user.avatar'];
      return this.usersService.getUsersByIds(
        requests.map((request) => request.sender),
        fields
      );
      // return await this.friendRequestRepository
      //   .createQueryBuilder('friend_request')
      //   .leftJoinAndSelect('friend_request.sender', 'sender')
      //   .where('friend_request.receiver = :userId', { userId })
      //   .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getFriendRequestsOfSender(userId: number) {
    try {
      const requests = await this.friendRequestRepository
        .createQueryBuilder('friend_request')
        .where('friend_request.sender = :userId', { userId })
        .getMany();
      const fields = ['user.id', 'user.username', 'user.avatar'];
      return this.usersService.getUsersByIds(
        requests.map((request) => request.receiver),
        fields
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteFriendRequest(sender: number, receiver: number) {
    try {
      return await this.friendRequestRepository
        .createQueryBuilder('friend_request')
        .delete()
        .where('friend_request.sender = :sender', { sender })
        .andWhere('friend_request.receiver = :receiver', { receiver })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async acceptFriendRequest(sender: number, receiver: number) {
    try {
      const request = await this.friendRequestRepository
        .createQueryBuilder('friend_request')
        .where('friend_request.sender = :sender', { sender })
        .andWhere('friend_request.receiver = :receiver', { receiver })
        .getOne();
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
