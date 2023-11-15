import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm'
import { User } from './User';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @ManyToMany((type) => User, (user) => user.products, {
        eager: true,
    })
    @JoinTable()
    users: User[]
}