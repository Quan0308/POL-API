import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "authorId"})
    author: number;

    @Column({default: new Date()})
    createdAt: Date;

    @Column()
    caption: string;

    @Column("int", {array: true, default: []})
    visibleToIds: number[];

    @Column()
    imageUrl: string;
}