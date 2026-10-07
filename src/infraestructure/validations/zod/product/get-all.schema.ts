import { z } from "zod";

export const findAllProductSchema = z.object({
    query: z.object({
        limit: z.coerce.number(),
        page: z.coerce.number(),
    })
});

export type FindAllProductsSchema = z.infer<typeof findAllProductSchema>;
