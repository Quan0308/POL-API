import { IsNotEmpty } from 'class-validator';

export class SendReactionDto {
  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  type: string;
}
