import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';

@Entity('friend_request')
export class FriendRequest {
  @PrimaryColumn()
  @ManyToMany((type) => User, (user) => user.sentFriendRequests)
  sender: number;

  @PrimaryColumn()
  @ManyToMany((type) => User, (user) => user.receivedFriendRequests)
  receiver: number;

  @Column()
  createdAt: Date;
}
