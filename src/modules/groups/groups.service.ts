import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateGroupDto } from "src/dto/group/create-group.dto";
import { Group } from "src/entities/group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>
    ) {}

    async create(group: CreateGroupDto): Promise<Group> {
        const newGroup = this.groupRepository.create(group);
        return await this.groupRepository.save(newGroup);
    }
}