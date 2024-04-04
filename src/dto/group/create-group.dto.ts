import { IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  memberIds: number[];
}
