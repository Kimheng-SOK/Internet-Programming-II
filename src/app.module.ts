import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ReceiptModule } from './receipts/receipts.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ReceiptModule, OrdersModule],
  providers: [OrdersService],
})
export class AppModule {}
