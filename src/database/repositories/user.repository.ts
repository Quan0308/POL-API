import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../baseRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository) //Constructor BaseRepository first
    }
}