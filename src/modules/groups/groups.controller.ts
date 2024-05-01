import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from 'src/dto/group/create-group.dto';
import { GROUP_MESSAGE, ResponseMessage, TransformationInterceptor } from 'src/ultils/response';
import { UpdateGroupDto } from 'src/dto/group/update-group.dto';

@Controller('groups')
@UseInterceptors(TransformationInterceptor)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':groupId')
  async getMembersInGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.getGroupById(groupId);
  }

  @Post()
  @ResponseMessage(GROUP_MESSAGE.GROUP_CREATED)
  async create(@Body(ValidationPipe) createGroup: CreateGroupDto) {
    return this.groupsService.create(createGroup);
  }

  @Put(':groupId')
  @ResponseMessage(GROUP_MESSAGE.GROUP_UPDATED)
  async updateGroup(@Param('groupId', ParseIntPipe) groupId: number, @Body() group: UpdateGroupDto) {
    return this.groupsService.updateGroup(groupId, group);
  }

  @Delete(':groupId')
  @ResponseMessage(GROUP_MESSAGE.GROUP_DELETED)
  async deleteGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.deleteGroup(groupId);
  }
}
