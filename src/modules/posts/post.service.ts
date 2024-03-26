import { Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from "@nestjs/common";
import { CommonService } from "../common/common.service";
import { UsersService } from "../users/users.service";
import { CreatePostDto } from "src/dto/post/create-post.dto";
import { Repository } from "typeorm";
import { Post } from "src/entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsService } from "../comments/comments.service";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private readonly commonService: CommonService,
        private readonly usersService: UsersService,
    ) {}

    async getViewablePosts(userId: number) {
        const user = await this.usersService.getUserById(userId);
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.comments', 'comments')
            .where(':userId = ANY(post.visibleToIds) OR array_length(post.visibleToIds, 1) = 0', { userId: user.id })
            .getMany();
        return posts;
    }

    async getPostById(postId: number) {
        const post = await this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :postId', { postId })
            .getOne();
        
        if(!post) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }
        return post;
    }

    async create(file, content: CreatePostDto) {
        try {
            const { authorId, caption, visibleToIds } = content;
            const author = await this.usersService.getUserById(authorId);
            const imageUrl = await this.commonService.uploadImage(file);

            const newPost = this.postRepository.create();
            newPost.authorId = author.id;
            newPost.caption = caption;
            newPost.visibleToIds = visibleToIds.concat(author.id);
            newPost.imageUrl = imageUrl;
            return await this.postRepository.save(newPost);
        } catch (error) {
            console.log(error);
            throw InternalServerErrorException;
        }
    }
}