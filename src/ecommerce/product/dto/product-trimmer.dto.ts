import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsUUID, Min } from 'class-validator';

export class ProductTrimmerDto {
  @ApiProperty()
  @IsUUID(4, { message: 'invalid product id' })
  @IsNotEmpty({ message: 'invalid product id' })
  productId: string;
}
