import { Test, TestingModule } from '@nestjs/testing';
import { SalesInvoiceLineService } from './sales-invoice-line.service';

describe('SalesInvoiceLineService', () => {
  let service: SalesInvoiceLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesInvoiceLineService],
    }).compile();

    service = module.get<SalesInvoiceLineService>(SalesInvoiceLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
