import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ReceiptModule } from './receipts/receipts.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ReceiptModule],
})
export class AppModule {}
