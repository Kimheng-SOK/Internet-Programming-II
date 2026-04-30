import { InputType, Field, Float, ID } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsUUID,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateReceiptInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @Field(() => ID)
  @IsUUID('4', { message: 'orderId must be a valid UUID' })
  orderId: string;
}
