import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    endpoint: string;

    @Column()
    request: string;

    @Column()
    createdAt: Date;
}
