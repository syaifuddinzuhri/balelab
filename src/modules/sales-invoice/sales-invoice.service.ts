import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';
import { SalesInvoice } from './entities/sales-invoice.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesInvoiceLine } from '../sales-invoice-line/entities/sales-invoice-line.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class SalesInvoiceService {
  constructor(
    @InjectRepository(SalesInvoice)
    private salesInvoiceRepository: Repository<SalesInvoice>,
    @InjectRepository(SalesInvoiceLine)
    private salesInvoiceLineRepository: Repository<SalesInvoiceLine>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  private generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `INV-${year}${month}${day}-${randomNumber}`;
  }

  async create(createSalesInvoiceDto: CreateSalesInvoiceDto): Promise<any> {
    const { invoice_lines, customer_id, ...invoiceData } = createSalesInvoiceDto;

    const customer = await this.customerRepository.findOneBy({ id: customer_id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customer_id} not found`);
    }

    const amount = invoice_lines.reduce((sum, line) => sum + line.amount, 0);
    const total_discount_amount = invoice_lines.reduce((sum, line) => sum + line.discount_amount, 0);
    const total_amount = invoice_lines.reduce((sum, line) => sum + line.amount - line.discount_amount, 0);

    const inv_number = this.generateInvoiceNumber();
    const inv_date = new Date();
    const salesInvoice = this.salesInvoiceRepository.create({
      ...invoiceData,
      inv_number,
      inv_date,
      customer_id: customer,
      amount,
      total_discount_amount,
      total_amount,
    });
    const savedInvoice = await this.salesInvoiceRepository.save(salesInvoice);

    const lines = await Promise.all(invoice_lines.map(async line => {
      const product = await this.productRepository.findOneBy({ id: line.product_id });
      if (!product) {
        throw new Error(`Product with ID ${line.product_id} not found`);
      }
      const total_amount = line.amount - line.discount_amount;
      const invoiceLine = this.salesInvoiceLineRepository.create({
        ...line,
        product_id: product,
        sales_invoice_id: savedInvoice,
        total_amount: total_amount,
      });

      return invoiceLine;
    }));

    await this.salesInvoiceLineRepository.save(lines);

    return savedInvoice;
  }

  async findAll(): Promise<SalesInvoice[]> {
    const invoices = await this.salesInvoiceRepository.find({ relations: ['sales_invoice_lines'] });
    return invoices;
  }

  async findOne(id: number): Promise<SalesInvoice> {
    const options: FindOneOptions<SalesInvoice> = { where: { id }, relations: ['sales_invoice_lines'] };
    const invoice = await this.salesInvoiceRepository.findOne(options);
    return invoice;
  }

  async update(id: number, updateSalesInvoiceDto: UpdateSalesInvoiceDto): Promise<SalesInvoice> {
    const { invoice_lines, customer_id, ...invoiceData } = updateSalesInvoiceDto;

    const options: FindOneOptions<SalesInvoice> = { where: { id }, relations: ['sales_invoice_lines'] };
    let invoice = await this.salesInvoiceRepository.findOne(options);

    if (!invoice) {
      throw new NotFoundException(`Sales invoice with id ${id} not found`);
    }

    invoice = {
      ...invoice,
      ...invoiceData,
    };

    if (customer_id) {
      const customer = await this.customerRepository.findOneBy({ id: customer_id });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customer_id} not found`);
      }

      invoice.customer_id = customer;
    }

    if (invoice_lines && invoice_lines.length > 0) {
      const updatedLines = await Promise.all(invoice_lines.map(async line => {
        let invoiceLine = invoice.sales_invoice_lines.find(l => l.id === line.id);
        if (!invoiceLine) {
          throw new NotFoundException(`Invoice line with ID ${line.id} not found`);
        }

        if (line.product_id) {
          const product = await this.productRepository.findOneBy({ id: line.product_id });
          if (!product) {
            throw new NotFoundException(`Product with ID ${line.product_id} not found`);
          }
          invoiceLine.product_id = product;
        }

        invoiceLine.amount = line.amount;
        invoiceLine.discount_amount = line.discount_amount;
        invoiceLine.total_amount = line.amount - line.discount_amount;

        await this.salesInvoiceLineRepository.save(invoiceLine);

        return invoiceLine;
      }));

      invoice.sales_invoice_lines = updatedLines;
    }

    const updatedInvoice = await this.salesInvoiceRepository.save(invoice);

    return updatedInvoice;

  }

  async remove(id: number): Promise<void> {
    try {
      const options: FindOneOptions<SalesInvoice> = { where: { id }, relations: ['sales_invoice_lines'] };
      const invoice = await this.salesInvoiceRepository.findOne(options);

      if (!invoice) {
        throw new NotFoundException(`Sales invoice with id ${id} not found`);
      }

      if (invoice.sales_invoice_lines && invoice.sales_invoice_lines.length > 0) {
        await Promise.all(
          invoice.sales_invoice_lines.map(async line => {
            await this.salesInvoiceLineRepository.delete(line.id);
          })
        );
      }

      await this.salesInvoiceRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete sales invoice: ${error.message}`);
    }
  }
}
