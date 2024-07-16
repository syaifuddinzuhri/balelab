import { Customer } from 'src/modules/customer/entities/customer.entity';
import { SalesInvoiceLine } from 'src/modules/sales-invoice-line/entities/sales-invoice-line.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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

    @OneToMany(() => SalesInvoiceLine, line => line.sales_invoice_id)
    sales_invoice_lines: SalesInvoiceLine[];
}
