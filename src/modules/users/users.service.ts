import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import { CreateUserDto, UpdateUserUsernameDto } from 'src/dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserPasswordDto } from 'src/dto/user/update-password.dto';
import { FriendRequestService } from '../friend-requests/friend-requests.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => FriendRequestService))
    private friendRequestService: FriendRequestService,
    private readonly commonService: CommonService
  ) {}

  async getNonFriends(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friends', 'friends')
      .where('user.id = :id', { id: userId })
      .getOne();
    const friendIds = user.friends.map((friend) => friend.id);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const request = await this.friendRequestService.getFriendRequestsOfSender(userId);
    const receiverIds = request.map((req) => req.receiver.id);
    try {
      const nonFriends = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id NOT IN (:...friends)', { friends: friendIds})
        .andWhere('user.id != :id', { id: userId })
        .andWhere('user.id NOT IN (:...receivers)', { receivers: receiverIds })
        .select(['user.id', 'user.username', 'user.avatar'])
        .getMany();
      return nonFriends;
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw InternalServerErrorException;
    }
  }

  async getUserById(id: number, fields?: string[]) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .select(fields)
        .getOne();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getUsersByIds(ids: number[], fields: string[]) {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.id IN (:...ids)', { ids })
        .select(fields)
        .getMany();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getUserFriends(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id'])
        .leftJoin('user.friends', 'friends')
        .addSelect(['friends.id', 'friends.username', 'friends.avatar'])
        .where('user.id = :id', { id })
        .getOne();
      return user.friends;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async addFriend(userId: number, friendId: number) {
    try {
      let newFriend = await this.getUserById(friendId);
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friends')
        .where('user.id = :id', { id: userId })
        .getOne();
      if (!user.friends) {
        user.friends = [];
      }
      user.friends.push(newFriend);
      await this.userRepository.save({
        ...user,
        updatedAt: new Date(),
      });
      newFriend = user;
      const friend = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friends')
        .where('user.id = :id', { id: friendId })
        .getOne();
      if (!friend.friends) {
        friend.friends = [];
      }
      friend.friends.push(user);
      await this.userRepository.save({
        ...friend,
        updatedAt: new Date(),
      });
      return;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async deleteFriend(userId: number, friendId: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friends')
        .where('user.id = :id', { id: userId })
        .getOne();
      user.friends = user.friends.filter((friend) => friend.id !== friendId);
      await this.userRepository.save({
        ...user,
        updatedAt: new Date(),
      });
      const friend = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friends')
        .where('user.id = :id', { id: friendId })
        .getOne();
      friend.friends = friend.friends.filter((f) => f.id !== userId);
      await this.userRepository.save({
        ...friend,
        updatedAt: new Date(),
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateUsername(id: number, updateUserUsernameDto: UpdateUserUsernameDto) {
    try {
      const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      const updatedUser = this.userRepository.create(updateUserUsernameDto);
      await this.userRepository.update(id, {
        ...updatedUser,
        updatedAt: new Date(),
      });
      return this.userRepository.findOne({ where: { id }, select: ['username'] });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateAvatar(id: number, file: File) {
    try {
      const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      if (user.avatar) {
        await this.commonService.deleteImage(user.avatar);
      }
      const imageUrl = await this.commonService.uploadImage(file);
      await this.userRepository.update(id, {
        avatar: imageUrl,
        updatedAt: new Date(),
      });
      return this.userRepository.findOne({ where: { id }, select: ['avatar'] });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto) {
    try {
      const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      if (user.password !== updateUserPasswordDto.currentPassword) {
        throw new BadRequestException('Current password is incorrect');
      }
      const updatedUser = this.userRepository.create({
        password: updateUserPasswordDto.newPassword,
      });
      await this.userRepository.update(id, {
        ...updatedUser,
        updatedAt: new Date(),
      });
      return null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
