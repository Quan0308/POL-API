import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity()
export class Reaction extends BaseEntity {
    @PrimaryColumn()
    authorId: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "authorId"})
    author: User;

    @PrimaryColumn()
    postId: number; 

    @ManyToOne(type => Post)
    @JoinColumn({name: "postId"})
    post: Post;
    
    @Column({default: new Date()})
    createdAt: Date;
    
    @Column()
    type: string;
}