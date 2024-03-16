import { IRepository } from "../interfaces/IRepository";
import { User } from '../../entities/user.entity'

export interface IUserRepository extends IRepository<User> {}