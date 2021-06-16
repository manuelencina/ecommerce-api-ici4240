import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Pool } from 'pg';
import { Configuration } from 'src/config/config.keys';
import { DatabaseService } from './database.service';
import { ModuleRef } from '@nestjs/core';
import { ConfigModule } from 'src/config/config.module';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get(Configuration.DB_USER),
    host: configService.get(Configuration.DB_HOST),
    database: configService.get(Configuration.DB_NAME),
    password: configService.get(Configuration.DB_PASSWORD),
    port: Number(configService.get(Configuration.DB_PORT)),
  });
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DB_POOL',
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get('DB_POOL') as Pool;
    return pool.end();
  }
}
