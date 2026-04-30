import { forwardRef, Inject, Injectable } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
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

    @Inject(forwardRef(() => NotificationsService))
    private readonly notifications: NotificationsService,
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

    this.client.emit('order_created', {
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    this.notifications.notify('order_created', {
      order: orderDto,
    });

    return { status: 'Order accepted', order: orderDto, savedOrder };
  }
}
