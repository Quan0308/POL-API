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
import { NotificationToken } from './notification-token.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: NotificationTypeEnum, default: NotificationTypeEnum.POST })
  type: NotificationTypeEnum;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  content: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'notification_token_id', type: 'varchar', nullable: false })
  notificationTokenId: number;

  @Column({ name: 'data', type: 'json', nullable: true, default: null })
  data: JSON;

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

  @ManyToOne(() => NotificationToken, (notificationToken) => notificationToken.notifications)
  NotificationTokens: NotificationToken;
}
