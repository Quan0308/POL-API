import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommonService } from "../common/common.service";
import { UsersService } from "../users/users.service";
import { CreatePostDto } from "src/dto/post/create-post.dto";
import { Repository } from "typeorm";
import { Post } from "src/entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private readonly commonService: CommonService,
        private readonly usersService: UsersService
    ) {}

    async savePost(file, content: CreatePostDto) {
        try {
            const { authorId, caption, visibleToIds } = content;
            const author = await this.usersService.getUserById(authorId);
            if(!author) {
                throw new NotFoundException(`User with id ${authorId} not found`);
            }

            const imageUrl = await this.commonService.uploadImage(file);

            const newPost = this.postRepository.create();
            newPost.authorId = authorId;
            newPost.caption = caption;
            newPost.visibleToIds = visibleToIds;
            newPost.imageUrl = imageUrl;
            return await this.postRepository.save(newPost);
        } catch (error) {
            console.log(error);
            throw InternalServerErrorException;
        }
    }
}