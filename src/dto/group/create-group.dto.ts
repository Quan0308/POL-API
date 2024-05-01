import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ownerId: number;

  @IsArray()
  memberIds: number[];
}
