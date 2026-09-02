import { z } from "zod";

export const findAllProductsSchema = z.object({});

export type FindAllProductsSchema = z.infer<typeof findAllProductsSchema>;
