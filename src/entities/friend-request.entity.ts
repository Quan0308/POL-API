import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('friend_request')
export class FriendRequest {
  @PrimaryColumn()
  senderId: number;

  @ManyToOne((type) => User, (user) => user.sentFriendRequests)
  sender: User;

  @PrimaryColumn()
  receiverId: number;

  @ManyToOne((type) => User, (user) => user.receivedFriendRequests)
  receiver: User;

  @Column()
  createdAt: Date;
}
