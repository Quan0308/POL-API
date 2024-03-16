import { User } from "src/entities/user.entity";
import { CreateUserDto } from "src/model/users/create-user.dto";
import { UpdateUserDto } from "src/model/users/update-user.dto";


export interface IUserService {
    findAll(): Promise<User[]>;
    findOne(id: Number): User;
    create(newUser: CreateUserDto): Promise<User>;
    update(id: Number, user: UpdateUserDto): User;
    delete(id: Number): User;
}