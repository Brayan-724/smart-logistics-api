import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateNetworkDto } from './dto/create-network.dto';
import { DatabaseProvider } from '../database/database';
import * as schema from '../database/schema';

@Injectable()
export class NetworksService {
  constructor(
    @Inject(DatabaseProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createNetworkDto: CreateNetworkDto) {
    const { edges } = createNetworkDto;

    const networkId = await this.db.transaction(async (tx) => {
      const [network] = await tx
        .insert(schema.networks)
        .values({ createdAt: new Date() })
        .returning();

      if (edges && edges.length > 0) {
        await tx.insert(schema.edges).values(
          edges.map((edge) => ({
            ...edge,
            network: network.id,
            createdAt: new Date(),
          })),
        );
      }

      return network.id;
    });

    return this.findOne(networkId);
  }

  async findAll() {
    return await this.db.query.networks.findMany({
      with: {
        edges: {
          columns: {
            id: true,
            from: true,
            to: true,
            cost: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const network = await this.db.query.networks.findFirst({
      where: eq(schema.networks.id, id),
      with: {
        edges: {
          columns: {
            id: true,
            from: true,
            to: true,
            cost: true,
          },
        },
      },
    });
    return network;
  }

  async remove(id: number): Promise<boolean> {
    return await this.db.transaction(async (tx) => {
      // Edges should be deleted by cascade if configured in DB, but Drizzle schema doesn't show cascade.
      // So we delete edges first manually to be safe.
      await tx.delete(schema.edges).where(eq(schema.edges.network, id));
      const [deleted] = await tx
        .delete(schema.networks)
        .where(eq(schema.networks.id, id))
        .returning();
      return !!deleted;
    });
  }
}
