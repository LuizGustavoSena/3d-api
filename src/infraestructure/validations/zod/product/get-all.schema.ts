import { z } from "zod";

export const findAllProductSchema = z.object({
    query: z.object({
        limit: z.coerce.number(),
        page: z.coerce.number(),
        category: z.string().optional(),
    })
});

export type FindAllProductsSchema = z.infer<typeof findAllProductSchema>;
