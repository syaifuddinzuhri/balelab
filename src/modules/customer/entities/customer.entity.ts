import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @Column({length: 20})
    phone: string;
    
    @Column('text')
    address: string;
}
