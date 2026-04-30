import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from 'src/orders/orders.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Query('orders')
  orders() {
    return this.orderService.findAll();
  }

  @Mutation('createOrder')
  createOrder(@Args('name') name: string, @Args('price') price: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.orderService.createOrder({ name, price });
  }
}
