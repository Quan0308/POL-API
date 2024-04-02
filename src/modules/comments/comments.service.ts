import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from '../posts/post.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    
    @Inject(forwardRef(() => PostService))
    private readonly postsService: PostService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { authorId, postId, content } = createCommentDto
    const newComment = this.commentRepository.create({
      authorId,
      postId,
      content,
      createdAt: new Date()
    });
    return await this.commentRepository.save(newComment)
  }

  async getCommentsByPostId(postId: number) {
    const post = await this.postsService.getPostById(postId)
    
    const comments = await this.commentRepository
          .createQueryBuilder('comment')
          .where('comment.postId = :postId', { postId: post.id })
          .orderBy('comment.createdAt', 'DESC')
          .getMany()
          
    return comments
  }
}
