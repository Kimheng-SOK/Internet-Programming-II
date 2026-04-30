import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
