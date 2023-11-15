import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne } from 'typeorm'
import { Product } from './Product';
import { User } from './User';

export enum AdressType{
    HOME = "home",
    WORK = "work",
    OTHER = "other"
}

@Entity()
export class Adress extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "enum",
        enum: AdressType,
        default: AdressType.HOME
    })
    type: AdressType;

    @Column({
        unique: true
    })
    adress: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => User, (user) => user.adresses)
    user: User
}