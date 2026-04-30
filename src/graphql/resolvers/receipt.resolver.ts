import {
  Args,
  Query,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrdersService } from 'src/orders/orders.service';
import { ReceiptService } from 'src/receipts/receipts.service';

@Resolver('Receipt')
export class ReceiptResolver {
  constructor(
    private readonly receiptService: ReceiptService,
    private readonly orderService: OrdersService,
  ) {}

  @Query('receipts')
  orders() {
    return this.receiptService.findAll();
  }

  @Query('receipt')
  product(@Args('id') id: string) {
    return this.receiptService.findOne(id);
  }

  @Mutation('createReceipt')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('orderId') orderId: string,
  ) {
    const order = await this.orderService.findOne(String(orderId));
    if (!order) {
      throw new Error('Order not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.receiptService.create({
      name,
      price,
      orderId,
    } as any);
  }

  @ResolveField('id')
  id(@Parent() receipt: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return receipt.receiptId;
  }

  @ResolveField('order')
  order(@Parent() receipt: any) {
    return this.orderService.findOne(String(receipt.orderId));
  }
}
