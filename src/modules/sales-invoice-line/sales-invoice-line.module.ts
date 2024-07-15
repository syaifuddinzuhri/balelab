import { Module } from '@nestjs/common';
import { SalesInvoiceLineService } from './sales-invoice-line.service';
import { SalesInvoiceLineController } from './sales-invoice-line.controller';

@Module({
  controllers: [SalesInvoiceLineController],
  providers: [SalesInvoiceLineService],
})
export class SalesInvoiceLineModule {}
