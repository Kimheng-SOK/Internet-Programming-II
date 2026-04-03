// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { NotificationsService } from 'src/notifications/notifications.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/database/entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    // @Inject(forwardRef(() => NotificationsService))
    // private readonly notifications: NotificationsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }

  // create order
  createOrder(orderDto: CreateOrderDto) {
    const order = this.orderRepo.create({
      name: orderDto.name,
      price: orderDto.price,
    });

    const savedOrder = this.orderRepo.save(order);

    // Method 1: Use forwardRef to avoid circular dependency lazy injection
    // this.notifications.notify('order_created', {
    //   order: orderDto,
    // });

    // Method 2: Use event publisher to decouple the services and avoid circular dependency
    this.client.emit('order_created', {
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    return { status: 'Order accepted', order: orderDto, savedOrder };
  }
}
