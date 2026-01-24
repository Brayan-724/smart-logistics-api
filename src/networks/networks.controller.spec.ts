import { Test, TestingModule } from '@nestjs/testing';
import { NetworksController } from './networks.controller';
import { NetworksService } from './networks.service';

describe('NetworksController', () => {
  let controller: NetworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworksController],
      providers: [NetworksService],
    }).compile();

    controller = module.get<NetworksController>(NetworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
