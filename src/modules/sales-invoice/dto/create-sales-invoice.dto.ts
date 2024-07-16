import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSalesInvoiceLineDto } from 'src/modules/sales-invoice-line/dto/create-sales-invoice-line.dto';

export class CreateSalesInvoiceDto {
    @IsNumber()
    @IsNotEmpty()
    customer_id: number;

    @ValidateNested({ each: true })
    @Type(() => CreateSalesInvoiceLineDto)
    invoice_lines: CreateSalesInvoiceLineDto[];
}
