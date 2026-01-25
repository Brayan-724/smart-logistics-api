import { createZodDto } from "nestjs-zod";
import z from "zod";

const optimizeRouteResponseSchema = z.object({
    graphId: z.string(),
    totalCost: z.number(),
    durationMs: z.number(),
    path: z.array(z.string()),
});

export class OptimizeRouteResponseDto extends createZodDto(optimizeRouteResponseSchema) { }
