import {
  Query,
  Args,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrdersService } from 'src/orders/orders.service';

@Resolver('Order')
export class OrderResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query('orders')
  orders() {
    return this.ordersService.findAll();
  }

  @Mutation('createOrder')
  createOrder(@Args('name') name: string, @Args('price') price: number) {
    return this.ordersService.createOrder({ name, price });
  }

  @ResolveField('id')
  id(@Parent() order: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return order.orderId;
  }

  @ResolveField('createAt')
  createAt(@Parent() order: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return order.createdAt;
  }
}
