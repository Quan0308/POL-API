import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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
}
