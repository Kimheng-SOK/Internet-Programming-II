import { Module } from '@nestjs/common';
import { ReceiptController } from './receipts.controller';
import { ReceiptService } from './receipts.service';
import { Receipt } from 'src/database/entities/receipts.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  // if you want to use another Module service from another you used export that module
  // so everryone can use it by importing
  imports: [TypeOrmModule.forFeature([Receipt]), NotificationsModule],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  // exports: [ReceiptService],
})
export class ReceiptModule {}
