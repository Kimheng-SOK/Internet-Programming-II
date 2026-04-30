import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { OrderType } from './order.type';

@ObjectType()
export class ReceiptType {
  @Field(() => ID)
  receiptId: string;

  @Field()
  issuedAt: Date;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ID)
  orderId: string;

  @Field(() => OrderType, { nullable: true })
  order?: OrderType;
}
