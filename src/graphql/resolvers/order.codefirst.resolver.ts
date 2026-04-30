import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderType } from '../types/order.type';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrderInput } from '../inputs/create-orders.input';

@Resolver(() => OrderType)
export class OrderCodeFirstResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Query(() => [OrderType])
  orders() {
    return this.orderService.findAll();
  }

  //   @Mutation(() => OrderType)
  //   createOrder(@Args('name') name: string, @Args('price') price: number) {
  //     return this.orderService.createOrder({ name, price });
  //   }

  @Mutation(() => OrderType)
  createOrder(@Args('input') input: CreateOrderInput) {
    return this.orderService.createOrder(input);
  }
}
