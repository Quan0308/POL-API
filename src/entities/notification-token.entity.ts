import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Notification } from './notification.entity';

@Entity({ name: 'notification_tokens' })
export class NotificationToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'token', type: 'varchar', nullable: false })
  token: string;

  @CreateDateColumn({ name: 'created_on', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @UpdateDateColumn({
    name: 'updated_on',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedOn: Date;

  @OneToOne(() => User, (user) => user.notificationToken)
  user: User;

  @OneToMany(() => Notification, (notification) => notification.NotificationTokens)
  notifications: Notification[];
}
