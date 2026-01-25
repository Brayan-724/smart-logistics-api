import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { OptimizeRouteDto } from './dto/optimize-route.dto';
import { OptimizeRouteResponseDto } from './dto/optimize-route-response.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoutingService } from './routing.service';
import { NetworksService } from '../networks/networks.service';

@ApiTags('routing')
@Controller('route')
export class RoutingController {
  constructor(
    private readonly routingService: RoutingService,
    private readonly networksService: NetworksService,
  ) {}

  @Post('/optimize/:id')
  @ApiOperation({ summary: 'Optimize route' })
  @ApiParam({ name: 'id', description: 'The ID of the graph/network' })
  @ApiBody({ type: OptimizeRouteDto })
  @ApiResponse({
    status: 200,
    description: 'Optimal route found.',
    type: OptimizeRouteResponseDto,
  })
  async optimize(
    @Param('id') id: string,
    @Body() optimizeRouteDto: OptimizeRouteDto,
  ) {
    const startTime = Date.now();
    const network = await this.networksService.findOne(Number(id));
    if (!network) {
      throw new NotFoundException(`Network with ID ${id} not found`);
    }
    const result = this.routingService.calculatePath(
      network.edges,
      optimizeRouteDto,
    );
    const durationMs = Date.now() - startTime;

    return {
      graphId: id,
      totalCost: result.totalCost,
      durationMs,
      path: result.path,
    };
  }
}
