import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryController } from './category.controller';
import { CategoryPostgreSQL } from './infrastructure/category-postgresql.repository';
import { CategoryFinderService } from './application/find/category-finder.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    CategoryPostgreSQL,
    {
      provide: 'CategoryRepository',
      useClass: CategoryPostgreSQL,
    },
    CategoryFinderService,
  ],
  controllers: [CategoryController],
  exports: [CategoryPostgreSQL, CategoryFinderService],
})
export class CategoryModule {}
