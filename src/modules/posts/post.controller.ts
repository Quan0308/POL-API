import { Body, Controller, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "src/dto/post/create-post.dto";
import { ResponseMessage, POST_MESSAGE, TransformationInterceptor } from "src/ultils/response";

@UseInterceptors(TransformationInterceptor)
@Controller("posts")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("created-posts")
    @ResponseMessage(POST_MESSAGE.POST_CREATED)
    @UseInterceptors(FileInterceptor("file"))
    async savePost(@UploadedFile() file, @Body(ValidationPipe) content: CreatePostDto) {
        return await this.postService.savePost(file, content);
    }
}
