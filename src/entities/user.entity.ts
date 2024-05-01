import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Group } from './group.entity';
import { FriendRequest } from './friend-request.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firebaseUID: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 'System' })
  createdBy: string;

  @Column({ nullable: true })
  avatar: string;

  // Other relationships
  @ManyToMany((type) => User)
  @JoinTable()
  friends: User[];

  @OneToMany((type) => Group, (group) => group.owner)
  groups: Group[];

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany((type) => Reaction, (reaction) => reaction.author)
  reactions: Reaction[];

  @OneToMany((type) => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[];

  @OneToMany((type) => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];
}
