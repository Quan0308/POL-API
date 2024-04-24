import { IsNotEmpty } from 'class-validator';

export class SendCommentDto {
  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  content: string;
}
