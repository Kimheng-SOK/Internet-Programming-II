import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReceiptService } from 'src/receipts/receipts.service';
import { OrdersService } from 'src/orders/orders.service';

@Resolver('Receipt')
export class ReceiptResolver {
  constructor(
    private readonly receiptService: ReceiptService,
    private readonly orderService: OrdersService,
  ) {}

  @Query('receipts')
  receipts() {
    return this.receiptService.findAll();
  }

  @Query('receipt')
  receipt(@Args('receiptId') receiptId: string) {
    return this.receiptService.findOne(receiptId);
  }

  @Mutation('createReceipt')
  createReceipt(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('orderId') orderId: string,
  ) {
    return this.receiptService.create({
      name,
      price,
      issuedAt: new Date().toISOString(),
      orderId,
    });
  }

  @ResolveField('order')
  order(@Parent() receipt: any) {
    return this.orderService.findOne(receipt.orderId);
  }
}
