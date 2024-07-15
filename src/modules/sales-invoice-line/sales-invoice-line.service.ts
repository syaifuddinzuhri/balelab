import { Injectable } from '@nestjs/common';
import { CreateSalesInvoiceLineDto } from './dto/create-sales-invoice-line.dto';
import { UpdateSalesInvoiceLineDto } from './dto/update-sales-invoice-line.dto';

@Injectable()
export class SalesInvoiceLineService {
  create(createSalesInvoiceLineDto: CreateSalesInvoiceLineDto) {
    return 'This action adds a new salesInvoiceLine';
  }

  findAll() {
    return `This action returns all salesInvoiceLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesInvoiceLine`;
  }

  update(id: number, updateSalesInvoiceLineDto: UpdateSalesInvoiceLineDto) {
    return `This action updates a #${id} salesInvoiceLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesInvoiceLine`;
  }
}
