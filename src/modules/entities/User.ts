import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from 'typeorm'
import { Product } from './Product';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @ManyToMany((type) => Product, (product) => product.users)
    products: Product[]
}