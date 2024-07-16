import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { SalesInvoiceService } from './sales-invoice.service';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';

@Controller('sales-invoice')
export class SalesInvoiceController {
  constructor(private readonly salesInvoiceService: SalesInvoiceService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createSalesInvoiceDto: CreateSalesInvoiceDto) {
    return this.salesInvoiceService.create(createSalesInvoiceDto);
  }

  @Get()
  findAll() {
    return this.salesInvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesInvoiceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSalesInvoiceDto: UpdateSalesInvoiceDto) {
    return this.salesInvoiceService.update(+id, updateSalesInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesInvoiceService.remove(+id);
  }
}
