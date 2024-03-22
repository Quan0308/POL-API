import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("save")
    @UseInterceptors(FileInterceptor("file"))
    async savePost(@UploadedFile() file) {
        return await this.postService.savePost(file);
    }
}
