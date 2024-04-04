import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  content: string;
}
