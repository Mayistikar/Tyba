import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'int', width: 200 })
    document: number;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    city: string;

    @Column()
    pass: string;

    @Column()
    token: string;
}
