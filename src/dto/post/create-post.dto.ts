import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    authorId: number;
    
    @IsString()
    caption: string;

    @IsArray()
    visibleToIds: number[];
}