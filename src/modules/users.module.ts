import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/userService/users.service';
import { UserRepository } from 'src/database/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
})
export class UsersModule {}
