import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(3),
    birthdate: z.coerce.date(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;