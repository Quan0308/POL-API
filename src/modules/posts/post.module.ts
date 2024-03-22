import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { CommonModule } from "../common/common.module";

@Module({
    imports: [CommonModule],
    controllers: [PostController],
    providers: [PostService],
})

export class PostModule {}