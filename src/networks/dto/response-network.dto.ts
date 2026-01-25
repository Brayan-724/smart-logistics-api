import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const responseNetworkDto = z.object({
  id: z.int(),
  createdAt: z.string(),
  edges: z.array(
    z.object({
      id: z.int(),
      from: z.string(),
      to: z.string(),
      cost: z.int(),
    }),
  ),
});

export class ResponseNetworkDto extends createZodDto(responseNetworkDto) {}
