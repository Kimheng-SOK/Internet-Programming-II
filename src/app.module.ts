import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ReceiptModule } from './receipts/receipts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ReceiptModule,
    OrdersModule,
    NotificationsModule,
    CoreModule,
  ],
  providers: [],
})
export class AppModule {}
