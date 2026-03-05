import { Module } from '@nestjs/common';
import { ReceiptController } from './receipts.controller';
import { ReceiptService } from './receipts.service';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
