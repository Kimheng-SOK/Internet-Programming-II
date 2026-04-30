import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateReceiptInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ID)
  orderId: string;
}
