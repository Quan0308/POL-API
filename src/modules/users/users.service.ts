import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = createUserDto.password;

      return await this.userRepository.save(user);
    } catch (error) {
       throw InternalServerErrorException;
    }
  }

  async getUserById(id: number) {
    const user = await this.userRepository
          .createQueryBuilder('user')
          .where('user.id = :id', { id })
          .getOne();
    
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
