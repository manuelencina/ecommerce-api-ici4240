import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserPostgreSQL } from './infrastructure/user-postgresql.repository';
import { UserCreatorService } from './application/user-creator/user-creator.service';
import { UserFinderService } from './application/user-finder/user-finder.service';
import { UserUpdaterService } from './application/update/user-updater.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserPostgreSQL,
    UserCreatorService,
    UserFinderService,
    {
      provide: 'UserRepository',
      useClass: UserPostgreSQL,
    },
    UserUpdaterService,
  ],
  exports: [
    UserPostgreSQL,
    UserCreatorService,
    UserFinderService,
    UserUpdaterService,
  ],
})
export class UserModule {}
