import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Group extends BaseEntity {
    @Column()
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ownerId: number;
    
    @ManyToOne(type => User, user => user.groups)
    owner: User;

    @Column("int", {array: true, default: []})
    memberIds: number[];

    @ManyToOne(type => User, user => user.memberOf)
    members: User[];

    @Column({default: new Date()})
    createdAt: Date;
}