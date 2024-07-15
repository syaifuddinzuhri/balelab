import { Injectable } from '@nestjs/common';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';

@Injectable()
export class SalesInvoiceService {
  create(createSalesInvoiceDto: CreateSalesInvoiceDto) {
    return 'This action adds a new salesInvoice';
  }

  findAll() {
    return `This action returns all salesInvoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesInvoice`;
  }

  update(id: number, updateSalesInvoiceDto: UpdateSalesInvoiceDto) {
    return `This action updates a #${id} salesInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesInvoice`;
  }
}
