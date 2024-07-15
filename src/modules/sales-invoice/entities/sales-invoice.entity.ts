import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class SalesInvoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    inv_number: string;

    @Column()
    inv_date: Date;

    @Column('decimal')
    amount: number;
    
    @Column('decimal')
    total_discount_amount: number;
    
    @Column('decimal')
    total_amount: number;

    @ManyToOne(() => Customer, { eager: true })
    @JoinColumn({ name: 'customer_id' })
    customer_id: Customer;
}
