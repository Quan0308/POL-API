import { IsNotEmpty } from "class-validator"

export class CreateReactionDto {
    @IsNotEmpty()
    authorId: number

    @IsNotEmpty()
    postId: number

    @IsNotEmpty()
    type: string
}