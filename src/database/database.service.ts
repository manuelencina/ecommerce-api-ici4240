import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject('DB_POOL') private pool: Pool) {}

  public async executeQuery(
    queryText: string,
    values: any[] = [],
  ): Promise<any[]> {
    this.logger.debug(`Executing query: ${queryText} (${values})`);
    return this.pool
      .query(queryText, values)
      .then((result: QueryResult) => {
        this.logger.debug(`Executed query, result size ${result.rows.length}`);
        return result.rows;
      })
      .catch((error) => {
        this.logger.debug(`Executed query, result ERROR: ${error}`);
        throw new Error(error.code);
      });
  }
}
