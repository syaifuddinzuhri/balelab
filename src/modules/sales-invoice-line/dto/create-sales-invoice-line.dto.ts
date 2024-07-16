import { IsDecimal, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSalesInvoiceLineDto {
    @IsNumber()
    amount: number;

    @IsNumber()
    discount_amount: number;

    id?: number;

    total_amount?: number;

    @IsNumber()
    @IsNotEmpty()
    product_id: number;
}
