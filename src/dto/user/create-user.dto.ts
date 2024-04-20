import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firebaseUID: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  username: string;
  password: string;
}
