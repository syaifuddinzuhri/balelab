import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesInvoiceLineDto } from './create-sales-invoice-line.dto';

export class UpdateSalesInvoiceLineDto extends PartialType(CreateSalesInvoiceLineDto) {}
