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
      throw InternalServerErrorException;
    }
  }

  async getUserById(id: number) {
    const user = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
}
