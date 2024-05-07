import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
    name: 'created_at',
  })
  createdAt: Date;

  @Column()
  ownerId: number;

  @ManyToOne((type) => User, (user) => user.groups)
  owner: User;

  @ManyToMany((type) => User)
  @JoinTable()
  members: User[];
}
