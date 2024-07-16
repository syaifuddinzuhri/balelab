import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) { }

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.findOne(id);
    await this.customerRepository.update(id, updateCustomerDto);
    return this.customerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
