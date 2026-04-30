import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';

// type Receipt = {
//   receiptId: string;
//   issuedAt: Date;
//   name: string;
//   price: number;
// };

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  receiptId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt!: Date;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({ nullable: true })
  orderId!: string; // ← FK column

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'orderId' })
  order?: Order;
}
