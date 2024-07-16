import { Module } from '@nestjs/common';
import { SalesInvoiceService } from './sales-invoice.service';
import { SalesInvoiceController } from './sales-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesInvoice } from './entities/sales-invoice.entity';
import { SalesInvoiceLine } from '../sales-invoice-line/entities/sales-invoice-line.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesInvoice, SalesInvoiceLine, Customer, Product])],
  controllers: [SalesInvoiceController],
  providers: [SalesInvoiceService],
})
export class SalesInvoiceModule { }
