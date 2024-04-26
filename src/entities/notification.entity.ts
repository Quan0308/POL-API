import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { NotificationTypeEnum } from '../ultils/enums/notification-type.enum';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: NotificationTypeEnum })
  type: NotificationTypeEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  content: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'token_id', type: 'varchar', nullable: false })
  tokenID: string;

  @Column({ name: 'post_id', nullable: false })
  postId: number;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'created_on', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedOn: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @ManyToOne(() => Post, (post) => post.notifications)
  post: Post;
}
