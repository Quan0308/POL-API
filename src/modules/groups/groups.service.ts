import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/dto/group/create-group.dto';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private usersService: UsersService,
  ) {}

  async create(group: CreateGroupDto): Promise<Group> {
    try {
      const newGroup = this.groupsRepository.create(group);
      return await this.groupsRepository.save(newGroup);
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async getGroupById(groupId: number): Promise<Group> {
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async getGroupsOfUser(userId: number) {
    try {
      return await this.groupsRepository.find({
        where: { ownerId: userId },
      });
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async getMembersInGroup(groupId: number): Promise<User[]> {
    const group = await this.getGroupById(groupId);
    const fields = ['user.id', 'user.username', 'user.avatar'];
    return this.usersService.getUsersByIds(group.memberIds, fields);
  }
}
