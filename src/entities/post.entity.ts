import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
    name: 'created_at',
  })
  createdAt: Date;

  @Column()
  caption: string;

  @Column({
    type: 'int',
    default: 0,
    name: 'frame',
  })
  frame: number;

  @Column({
    type: 'int',
    default: 0,
    name: 'font',
  })
  font: number;

  @Column()
  imageUrl: string;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @ManyToMany((type) => User)
  @JoinTable()
  visibleTo: User[];
}
