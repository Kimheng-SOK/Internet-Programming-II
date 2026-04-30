import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderType {
  @Field(() => ID)
  orderId: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  createdAt: Date;
}
