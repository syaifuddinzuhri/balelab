import { Test, TestingModule } from '@nestjs/testing';
import { SalesInvoiceLineController } from './sales-invoice-line.controller';
import { SalesInvoiceLineService } from './sales-invoice-line.service';

describe('SalesInvoiceLineController', () => {
  let controller: SalesInvoiceLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesInvoiceLineController],
      providers: [SalesInvoiceLineService],
    }).compile();

    controller = module.get<SalesInvoiceLineController>(SalesInvoiceLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
