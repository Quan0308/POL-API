import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  authorId: number;

  @ManyToOne((type) => User, (user) => user.comments)
  author: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne((type) => Post, (post) => post.comments)
  post: Post;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
    name: 'created_at',
  })
  createdAt: Date;

  @Column()
  content: string;
}
