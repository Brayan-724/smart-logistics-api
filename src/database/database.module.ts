import { Module } from '@nestjs/common';
import { DatabaseProvider, databaseProvider } from './database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
