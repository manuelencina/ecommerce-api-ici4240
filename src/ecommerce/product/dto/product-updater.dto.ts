import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsUUID, Min } from 'class-validator';

export class ProductUpdaterDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
}
