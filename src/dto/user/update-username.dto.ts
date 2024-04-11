import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
