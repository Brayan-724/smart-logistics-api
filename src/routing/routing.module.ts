import { Module } from '@nestjs/common';
import { RoutingService } from './routing.service';
import { RoutingController } from './routing.controller';
import { NetworksModule } from 'src/networks/networks.module';
import { NetworksService } from 'src/networks/networks.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [NetworksModule, DatabaseModule],
  providers: [NetworksService, RoutingService],
  controllers: [RoutingController]
})
export class RoutingModule { }
