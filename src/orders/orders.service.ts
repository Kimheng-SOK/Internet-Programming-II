import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async findAll() {
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(orderId: string) {
    const order = await this.orderRepo.findOne({ where: { orderId } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(dto: CreateOrderDto) {
    const order = this.orderRepo.create({
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      name: dto.name,
      price: dto.price,
    });
    return this.orderRepo.save(order);
  }

  async update(orderId: string, dto: UpdateOrderDto) {
    const order = await this.findOne(orderId);

    if (dto.createdAt !== undefined) order.createdAt = new Date(dto.createdAt);
    if (dto.name !== undefined) order.name = dto.name;
    if (dto.price !== undefined) order.price = dto.price;

    return this.orderRepo.save(order);
  }

  async remove(orderId: string) {
    const order = await this.findOne(orderId);
    await this.orderRepo.remove(order);
    return { delete: true, orderId };
  }
}
