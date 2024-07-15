import { Test, TestingModule } from '@nestjs/testing';
import { SalesInvoiceController } from './sales-invoice.controller';
import { SalesInvoiceService } from './sales-invoice.service';

describe('SalesInvoiceController', () => {
  let controller: SalesInvoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesInvoiceController],
      providers: [SalesInvoiceService],
    }).compile();

    controller = module.get<SalesInvoiceController>(SalesInvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
