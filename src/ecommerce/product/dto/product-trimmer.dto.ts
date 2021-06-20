import { IsNotEmpty, IsInt, IsUUID, Min } from 'class-validator';

export class ProductTrimmerDto {
  @IsUUID(4, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid product id' })
  productId: string;

  @IsUUID(4, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid cart id' })
  cartId: string;
}
