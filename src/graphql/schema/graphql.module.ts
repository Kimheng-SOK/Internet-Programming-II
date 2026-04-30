import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { ReceiptModule } from 'src/receipts/receipts.module';
import { OrderResolver } from '../resolvers/order.resolver';
import { ReceiptResolver } from '../resolvers/receipt.resolver';

@Module({
  imports: [OrdersModule, ReceiptModule],
  providers: [OrderResolver, ReceiptResolver],
})
export class GraphQLModule {}
