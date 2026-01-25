import { Test, TestingModule } from '@nestjs/testing';
import { RoutingService } from './routing.service';
import { OptimizeRouteDto } from './dto/optimize-route.dto';

describe('RoutingService', () => {
  let service: RoutingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutingService],
    }).compile();

    service = module.get<RoutingService>(RoutingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculatePath', () => {
    it('should find the shortest path', () => {
      const edges = [
        { from: 'A', to: 'B', cost: 10 },
        { from: 'A', to: 'C', cost: 15 },
        { from: 'B', to: 'D', cost: 12 },
        { from: 'C', to: 'D', cost: 10 },
        { from: 'D', to: 'E', cost: 2 },
      ];

      const payload = {
        originNodeId: 'A',
        destinationNodeId: 'E',
      } satisfies OptimizeRouteDto;

      const result = service.calculatePath(edges, payload);

      expect(result.totalCost).toBe(24); // A -> B -> D -> E (10 + 12 + 2)
      expect(result.path).toEqual(['A', 'B', 'D', 'E']);
    });

    it('should return -1 if no path exists', () => {
      const edges = [
        { from: 'A', to: 'B', cost: 10 },
        { from: 'C', to: 'D', cost: 10 },
      ];

      const payload = {
        originNodeId: 'A',
        destinationNodeId: 'D',
      } satisfies OptimizeRouteDto;

      const result = service.calculatePath(edges, payload);

      expect(result.totalCost).toBe(-1);
      expect(result.path).toEqual([]);
    });
  });
});
