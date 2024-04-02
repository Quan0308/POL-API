import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Group extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ownerId: number;
    
    @ManyToOne(type => User, user => user.groups)
    owner: User;

    @Column("int", {array: true, default: []})
    memberIds: number[];

    @ManyToMany(type => User, user => user.memberOf)
    @JoinTable()
    members: User[];

    @Column()
    createdAt: Date;
}