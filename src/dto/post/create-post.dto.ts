import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  authorId: number;

  @IsString()
  caption: string;

  @IsArray()
  visibleToIds: number[];

  frame: number;

  font: number;
}
