import { Module } from '@nestjs/common';
import { OrderResolver } from '../resolvers/order.resolver';
import { ReceiptResolver } from '../resolvers/receipt.resolver';
import { OrdersModule } from 'src/orders/orders.module';
import { ReceiptModule } from 'src/receipts/receipts.module';

@Module({
  imports: [OrdersModule, ReceiptModule],
  providers: [OrderResolver, ReceiptResolver],
})
export class GraphqlModule {}
