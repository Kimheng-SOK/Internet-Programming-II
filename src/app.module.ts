import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ReceiptModule } from './receipts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ReceiptModule,
    NotificationsModule,
  ],
})
export class AppModule {}
