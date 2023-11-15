import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToMany((type) => User, (user) => user.products, {
        eager: true,
    })
    @JoinTable()
    users: User[]
}