import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { NetworksService } from "./networks.service";
import { CreateNetworkDto } from "./dto/create-network.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseNetworkDto } from "./dto/response-network.dto";

@ApiTags("networks")
@Controller("network")
export class NetworksController {
  constructor(private readonly networksService: NetworksService) { }

  @Post("/upload")
  @ApiOperation({ summary: "Create a new network" })
  @ApiBody({ type: CreateNetworkDto })
  @ApiResponse({
    status: 201,
    description: "The network has been successfully created.",
    type: ResponseNetworkDto,
  })
  create(@Body() createNetworkDto: CreateNetworkDto) {
    return this.networksService.create(createNetworkDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all networks" })
  @ApiResponse({
    status: 200,
    description: "List of all networks.",
    type: [ResponseNetworkDto],
  })
  findAll() {
    return this.networksService.findAll();
  }

  @Get("/nodes/:id")
  @ApiOperation({ summary: "Get a network by ID" })
  @ApiParam({ name: "id", description: "The ID of the network" })
  @ApiResponse({
    status: 200,
    description: "The network details.",
    type: ResponseNetworkDto,
  })
  @ApiResponse({ status: 404, description: "Network not found." })
  async findOne(@Param("id") id: string) {
    const network = await this.networksService.findOne(+id);
    if (!network) {
      throw new NotFoundException(`Network with ID ${id} not found`);
    }
    return network;
  }

  @Delete("/nodes/:id")
  @ApiOperation({ summary: "Delete a network by ID" })
  @ApiParam({ name: "id", description: "The ID of the network" })
  @ApiResponse({
    status: 200,
    description: "The network has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Network not found." })
  async remove(@Param("id") id: string) {
    const deleted = await this.networksService.remove(+id);
    if (!deleted) {
      throw new NotFoundException(`Network with ID ${id} not found`);
    }
    return { message: "Network deleted successfully" };
  }
}
