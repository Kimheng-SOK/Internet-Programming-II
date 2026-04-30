import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReceiptType } from '../types/receipt.type';
import { CreateReceiptInput } from '../inputs/create-receipts.input';
import { ReceiptService } from '../../receipts/receipts.service';
import { OrdersService } from '../../orders/orders.service';
import { OrderType } from '../types/order.type';

@Resolver(() => ReceiptType)
export class ReceiptCodeFirstResolver {
  constructor(
    private readonly receiptService: ReceiptService,
    private readonly orderService: OrdersService,
  ) {}

  @Query(() => [ReceiptType])
  receipts() {
    return this.receiptService.findAll();
  }

  @Query(() => ReceiptType, { nullable: true })
  receipt(@Args('receiptId') receiptId: string) {
    return this.receiptService.findOne(receiptId);
  }

  @Query(() => [ReceiptType], { name: 'receiptsByOrder' })
  receiptsByOrder(@Args('orderId') orderId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.receiptService.findByOrder(orderId);
  }

  //   @Mutation(() => ReceiptType)
  //   createReceipt(@Args('input') input: CreateReceiptInput) {
  //     return this.receiptService.create(input);
  //   }

  @Mutation(() => ReceiptType)
  createReceipt(@Args('input') input: CreateReceiptInput) {
    return this.receiptService.create(input);
  }

  @ResolveField(() => OrderType, { nullable: true })
  order(@Parent() receipt: ReceiptType) {
    return this.orderService.findOne(receipt.orderId);
  }
}
