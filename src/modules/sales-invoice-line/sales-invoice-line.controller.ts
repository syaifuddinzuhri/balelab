import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SalesInvoiceLineService } from './sales-invoice-line.service';
import { CreateSalesInvoiceLineDto } from './dto/create-sales-invoice-line.dto';
import { UpdateSalesInvoiceLineDto } from './dto/update-sales-invoice-line.dto';

@Controller('sales-invoice-line')
export class SalesInvoiceLineController {
  constructor(private readonly salesInvoiceLineService: SalesInvoiceLineService) {}

  @Post()
  create(@Body() createSalesInvoiceLineDto: CreateSalesInvoiceLineDto) {
    return this.salesInvoiceLineService.create(createSalesInvoiceLineDto);
  }

  @Get()
  findAll() {
    return this.salesInvoiceLineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesInvoiceLineService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSalesInvoiceLineDto: UpdateSalesInvoiceLineDto) {
    return this.salesInvoiceLineService.update(+id, updateSalesInvoiceLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesInvoiceLineService.remove(+id);
  }
}
