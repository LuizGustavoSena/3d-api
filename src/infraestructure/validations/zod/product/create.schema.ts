import { z } from "zod";

export const createProductSchema = z.object({
    material: z.number(),
    name: z.string(),
    printingTime: z.number(),
    value: z.number(),
    image: z.instanceof(Buffer),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;