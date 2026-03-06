import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
