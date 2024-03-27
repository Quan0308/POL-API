import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/comment';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PostService } from '../posts/post.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    
    @Inject(forwardRef(() => PostService))
    private readonly postsService: PostService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { authorId, postId, content } = createCommentDto
    const author = await this.usersService.getUserById(authorId)
    const post = await this.postsService.getPostById(postId)

    const newComment = this.commentRepository.create();
    newComment.authorId = author.id
    newComment.postId = post.id
    newComment.content = content

    return await this.commentRepository.save(newComment)
  }

  async getCommentsByPostId(postId: number) {
    const post = await this.postsService.getPostById(postId)
    
    const comments = await this.commentRepository
          .createQueryBuilder('comment')
          .where('comment.postId = :postId', { postId: post.id })
          .getMany()
          
    return comments
  }
}
