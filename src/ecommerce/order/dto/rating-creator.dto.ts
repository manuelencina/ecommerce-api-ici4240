import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class RatingCreatorDto {
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  comment: string;
}
