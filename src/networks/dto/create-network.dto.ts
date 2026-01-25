import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const edgeDto = z.object({
  from: z.string(),
  to: z.string(),
  cost: z.number(),
});

const networkDto = z.object({
  edges: z.array(edgeDto),
});

export class CreateNetworkDto extends createZodDto(networkDto) {}
