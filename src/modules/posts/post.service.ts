import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommonService } from "../common/common.service";
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
    ) {}

    async getViewablePosts(userId: number) {
        try 
        {
            const posts = await this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect('post.author', 'author')
                .leftJoinAndSelect('post.comments', 'comments')
                .leftJoinAndSelect('post.reactions', 'reactions')
                .where(':id = ANY(post.visibleToIds) OR array_length(post.visibleToIds, 1) = 0', { id: userId })
                .getMany();
            return posts;
        } catch (error) {
            console.log(error);
            throw InternalServerErrorException;
        }
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
            const imageUrl = await this.commonService.uploadImage(file);
            const newPost = this.postRepository.create(
                {
                    authorId,
                    caption,
                    visibleToIds: visibleToIds.concat(authorId).sort(),
                    imageUrl,
                }
            );
            return await this.postRepository.save(newPost);
        } catch (error) {
            console.log(error);
            throw InternalServerErrorException;
        }
    }
}