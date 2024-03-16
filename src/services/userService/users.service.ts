import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../model/users/create-user.dto';
import { UpdateUserDto } from '../../model/users/update-user.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { IUserService } from '../interfaces/IUserService';
import { User } from 'src/entities/user.entity';
@Injectable()
export class UsersService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {}
    findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }
    findOne(id: Number): User {
        throw new Error('Method not implemented.');
    }
    create(newUser: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = newUser.name;
        user.password = "123456";
        const createdUser =  this.userRepository.create(user);
        return this.userRepository.save(createdUser);
    }
    update(id: Number, user: UpdateUserDto): User {
        throw new Error('Method not implemented.');
    }
    delete(id: Number): User {
        throw new Error('Method not implemented.');
    }
}
