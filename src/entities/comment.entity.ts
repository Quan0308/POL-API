import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
    content: string;
}