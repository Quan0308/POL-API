import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';

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

    @Column ({ default: true })
    isActive: boolean;

    @Column ({ default: new Date()})
    createdAt: Date;

    @Column ({ default: new Date()})
    updatedAt: Date;

    @Column ({ default: "System"})
    createdBy: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[]

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[]

    @OneToMany(type => Reaction, reaction => reaction.author)
    reactions: Reaction[]

    @Column()
    Avatar: string;
}
