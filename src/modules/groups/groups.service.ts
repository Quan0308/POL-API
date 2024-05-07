import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from 'src/dto/group/create-group.dto';
import { UpdateGroupDto } from 'src/dto/group/update-group.dto';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private usersService: UsersService
  ) {}

  async getGroupsOfUser(ownerId: number, includeMembers: boolean): Promise<Group[]> {
    try {
      var groups;
      if (!includeMembers)
        groups = await this.groupsRepository
          .createQueryBuilder('group')
          .leftJoinAndSelect('group.members', 'member')
          .select(['group.id AS id', 'group.name as name'])
          .addSelect('COUNT(member.id)', 'memberCount')
          .where('group.ownerId = :ownerId', { ownerId })
          .groupBy('group.id')
          .getRawMany();
      else
        groups = await this.groupsRepository
          .createQueryBuilder('group')
          .select(['group.id', 'group.name', 'group.ownerId'])
          .leftJoin('group.members', 'members')
          .addSelect(['members.id'])
          .where('group.ownerId = :ownerId', { ownerId })
          .getMany();

      if (includeMembers) {
        groups = groups.map((group: { id: number; name: string; members: { id: number }[] }) => ({
          id: group.id,
          name: group.name,
          memberIds: group.members.map((member) => member.id),
        }));
      }
      return groups;
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async create(group: CreateGroupDto) {
    try {
      const { ownerId, name, memberIds } = group;
      const newGroup = this.groupsRepository.create({
        ownerId,
        name,
      });
      if (memberIds.length > 0) newGroup.members = await this.usersService.getUsersByIds(memberIds.sort(), ['user.id']);
      return await this.groupsRepository.save(newGroup);
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async getGroupById(groupId: number): Promise<Group> {
    const group = await this.groupsRepository
      .createQueryBuilder('group')
      .select(['group.id', 'group.name'])
      .leftJoin('group.members', 'members')
      .addSelect(['members.id', 'members.username', 'members.avatar'])
      .where('group.id = :groupId', { groupId })
      .getOne();

    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(groupId: number, group: UpdateGroupDto): Promise<Group> {
    try {
      const { name, memberIds } = group;
      const groupToUpdate = await this.groupsRepository.findOne({
        where: { id: groupId },
      });
      groupToUpdate.name = name;
      if (memberIds.length > 0)
        groupToUpdate.members = await this.usersService.getUsersByIds(memberIds.sort(), ['user.id']);
      else groupToUpdate.members = [];
      return await this.groupsRepository.save(groupToUpdate);
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }

  async deleteGroup(groupId: number): Promise<void> {
    try {
      await this.groupsRepository.delete({ id: groupId });
    } catch (error) {
      console.log(error);
      throw InternalServerErrorException;
    }
  }
}
