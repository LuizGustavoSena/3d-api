import { z } from "zod";

export const createContractSchema = z.object({
    body: z.object({
        material: z.number(),
        quantity: z.number(),
        porcentageFilling: z.number(),
        observations: z.string().optional(),
        files: z.array(
            z.object({
                type: z.string(),
                name: z.string(),
                file: z.instanceof(Buffer),
            })
        ),
    }),
    user: z.object({
        id: z.string(),
    }).loose(),
});

export type CreateContractSchema = z.infer<typeof createContractSchema>;
