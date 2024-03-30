import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from 'src/dto/group/create-group.dto';
import { TransformationInterceptor } from 'src/ultils/response';

@Controller('groups')
@UseInterceptors(TransformationInterceptor)
export class GroupsController {
    constructor(
        private readonly groupsService: GroupsService
    ) {}

    @Get(':groupId/members')
    async getMembersInGroup(@Param('groupId', ParseIntPipe) groupId: number) {
        return this.groupsService.getMembersInGroup(groupId);
    }

    @Post()
    async create(@Body(ValidationPipe) createGroup: CreateGroupDto) {
        return this.groupsService.create(createGroup)
    }
}
