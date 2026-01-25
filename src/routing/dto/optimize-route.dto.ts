import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const optimizeRouteSchema = z.object({
  originNodeId: z.string(),
  destinationNodeId: z.string(),
  preference: z.enum(['shortest', 'fastest']).optional(),
  constraints: z
    .object({
      avoidHighways: z.boolean().optional(),
    })
    .optional(),
});

export class OptimizeRouteDto extends createZodDto(optimizeRouteSchema) {}
