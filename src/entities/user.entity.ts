import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Group } from './group.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ default: 'System' })
  createdBy: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany((type) => Reaction, (reaction) => reaction.author)
  reactions: Reaction[];

  @Column({ nullable: true })
  avatar: string;

  @OneToMany((type) => Group, (group) => group.owner)
  groups: Group[];

  @OneToMany((type) => Group, (group) => group.members)
  memberOf: Group[];
}
