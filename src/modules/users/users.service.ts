import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../common/common.service';
import { CreateUserDto, UpdateUserDto } from 'src/dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserPasswordDto } from 'src/dto/user/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly commonService: CommonService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log(error);
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
        .getMany();
      return user;
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

  async updateUsername(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      const updatedUser = this.userRepository.create(updateUserDto);
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
