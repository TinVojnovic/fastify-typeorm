import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany } from 'typeorm'
import { Product } from './Product';
import { Adress } from './Adress';

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

    @Column()
    salt: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @OneToMany(() => Adress, (adress) => adress.user)
    adresses: Adress[]
}