import { IsNotEmpty, IsInt, IsUUID, Min } from 'class-validator';

export class ProductUpdaterDto {
  @IsUUID(4, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid product id' })
  productId: string;

  @IsUUID(4, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid cart id' })
  cartId: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
}
