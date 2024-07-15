import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SalesInvoiceModule } from './modules/sales-invoice/sales-invoice.module';
import { SalesInvoiceLineModule } from './modules/sales-invoice-line/sales-invoice-line.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        extra: {
          trustServerCertificate: true,
        },
      }),
      inject: [ConfigService],
    }),
    ProductModule,
    CustomerModule,
    SalesInvoiceModule,
    SalesInvoiceLineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
