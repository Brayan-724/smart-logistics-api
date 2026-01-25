import { Module } from '@nestjs/common';
import { NetworksModule } from './networks/networks.module';
import { RoutingModule } from './routing/routing.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    NetworksModule,
    RoutingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
