import { Module } from '@nestjs/common';
// import { OrderResolver } from '../resolvers/order.resolver';
// import { ReceiptResolver } from '../resolvers/receipt.resolver';
import { OrdersModule } from 'src/orders/orders.module';
import { ReceiptModule } from 'src/receipts/receipts.module';
import { ReceiptCodeFirstResolver } from '../resolvers/receipt.codefirst.resolver';
import { OrderCodeFirstResolver } from '../resolvers/order.codefirst.resolver';

@Module({
  imports: [OrdersModule, ReceiptModule],
  //   providers: [OrderResolver, ReceiptResolver],
  providers: [OrderCodeFirstResolver, ReceiptCodeFirstResolver],
})
export class GraphqlModule {}
