import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Group } from './group.entity';
import { FriendRequest } from './friend-request.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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

  @Column({ nullable: true })
  avatar: string;

  @ManyToMany((type) => User)
  @JoinTable()
  friends: User[];

  // Other relationships
  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany((type) => Reaction, (reaction) => reaction.author)
  reactions: Reaction[];

  @OneToMany((type) => Group, (group) => group.owner)
  groups: Group[];

  @OneToMany((type) => Group, (group) => group.members)
  memberOf: Group[];

  @OneToMany((type) => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[];

  @OneToMany((type) => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[];
}
