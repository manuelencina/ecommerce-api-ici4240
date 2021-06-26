import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RatingCreatorDto {
  @ApiProperty()
  @IsNotEmpty()
  score: number;

  @ApiProperty()
  @IsNotEmpty()
  comment: string;
}
