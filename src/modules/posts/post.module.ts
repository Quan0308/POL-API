import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { CommonModule } from "../common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/entities/post.entity";
import { UsersModule } from "../users/users.module";
@Module({
    imports: [CommonModule, UsersModule, TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService],
})

export class PostModule {}