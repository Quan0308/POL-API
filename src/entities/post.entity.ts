import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @ManyToOne((type) => User, (user) => user.posts)
  author: User;

  @Column()
  createdAt: Date;

  @Column()
  caption: string;

  @Column('int', { array: true, default: [] })
  visibleToIds: number[];

  @Column()
  imageUrl: string;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];
}
