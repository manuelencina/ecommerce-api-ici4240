import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CategoryRepository } from '../domain/category-repository';

@Injectable()
export class CategoryPostgreSQL implements CategoryRepository {
  public constructor(private readonly databaseService: DatabaseService) {}
  public async get() {
    const categories = await this.databaseService.executeQuery(
      'SELECT * FROM categories',
    );
    return categories;
  }
}
