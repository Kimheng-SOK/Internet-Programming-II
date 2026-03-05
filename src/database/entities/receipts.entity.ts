import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity
export class Receipt {
  @PrimaryGeneratedColumn
  receiptId: string;

  @Column()
  issuedAt: Date;

  @Column
  name: string;

  @Column
  price: number;
}
