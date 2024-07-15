import { Product } from "src/modules/product/entities/product.entity";
import { SalesInvoice } from "src/modules/sales-invoice/entities/sales-invoice.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SalesInvoiceLine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    amount: number;
    
    @Column('decimal')
    discount_amount: number;
    
    @Column('decimal')
    total_amount: number;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product_id: Product;

    @ManyToOne(() => SalesInvoice, { eager: true })
    @JoinColumn({ name: 'sales_invoice_id' })
    sales_invoice_id: SalesInvoice;
}
