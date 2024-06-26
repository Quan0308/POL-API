import { BaseEntity, Entity, Column, ManyToOne, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Reaction extends BaseEntity {
  @PrimaryColumn()
  authorId: number;

  @ManyToOne((type) => User, (user) => user.reactions)
  author: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne((type) => Post, (post) => post.reactions)
  post: Post;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
  })
  createdAt: Date;

  @Column()
  type: string;
}
