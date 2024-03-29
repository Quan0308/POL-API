import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CommonService } from "../common/common.service";
import { Repository } from "typeorm";
import { Post } from "src/entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePostDto, LoadPost } from "src/dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        private readonly commonService: CommonService,
    ) {}

    async getViewablePosts(userId: number): Promise<LoadPost[]> {
        try 
        {
            const posts = await this.postRepository
                .createQueryBuilder('post')
                .select(['post.id', 'post.caption', 'post.imageUrl', 'post.createdAt'])
                .orderBy('post.createdAt', 'DESC')
                .leftJoin('post.author', 'author')
                .addSelect(['author.id', 'author.avatar', 'author.username'])
                .leftJoin('post.comments', 'comments')
                .loadRelationCountAndMap('post.countComments', 'post.comments')
                .leftJoin('post.reactions', 'reactions')
                .leftJoin('reactions.author', 'reactionAuthor')
                .addSelect(['reactions.type', 'reactionAuthor.avatar', 'reactionAuthor.username'])
                .orderBy('reactions.createdAt', 'DESC')
                .where(':id = ANY(post.visibleToIds) OR array_length(post.visibleToIds, 1) = 0', { id: userId })
                .getMany();
                
            return posts.map(p => {
                return new LoadPost(p);
            });  
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