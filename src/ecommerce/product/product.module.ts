import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductFinderService } from './application/product-finder/product-finder.service';
import { ProductPostgresqlRepository } from './infrastructure/product-postgresql.repository';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ProductFinderService,
    ProductPostgresqlRepository,
    {
      provide: 'ProductRepository',
      useClass: ProductPostgresqlRepository,
    },
  ],
  exports: [ProductFinderService, ProductPostgresqlRepository],
  controllers: [ProductController],
})
export class ProductModule {}
