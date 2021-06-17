import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserRepositoryPostgresql } from './infrastructure/user-postgresql.repository';
import { UserCreatorService } from './application/user-creator/user-creator.service';
import { UserFinderService } from './application/user-finder/user-finder.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserRepositoryPostgresql,
    UserCreatorService,
    UserFinderService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPostgresql,
    },
  ],
  exports: [UserRepositoryPostgresql, UserCreatorService, UserFinderService],
})
export class UserModule {}
