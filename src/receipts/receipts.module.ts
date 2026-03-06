import { Module } from '@nestjs/common';
import { ReceiptController } from './receipts.controller';
import { ReceiptService } from './receipts.service';
import { Receipt } from 'src/database/entities/receipts.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
