import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendRequestDto } from './create-friend-request.dto';

export class DeleteFriendRequestDto extends PartialType(CreateFriendRequestDto) {}
