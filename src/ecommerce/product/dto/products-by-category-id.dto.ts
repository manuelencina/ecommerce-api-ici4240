import { IsUUID } from 'class-validator';

export class ProductsByCategoryIdDto {
  @IsUUID(4, { each: true })
  categoryId: string;
}
