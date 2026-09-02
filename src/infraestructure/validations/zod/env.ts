import "dotenv/config";
import { z } from "zod";
import { InvalidEnvError } from "../../../domain/errors/sistem/invalid-env.error";

const schema = z.object({
    MYSQL_URL: z.string(),
    SECRET_KEY_TOKEN: z.string(),
    SECRET_KEY_ENCRYPT: z.string(),
    SECRET_IV_ENCRYPT: z.string(),
    NODE_ENV: z.enum(['dev', 'prd']),
    PORT: z.coerce.number().default(3000),
    S3_BUCKET: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_REGION: z.string(),
});

const _env = schema.safeParse({
    ...process.env,
    URLS_ENABLE_CORS: process.env.URLS_ENABLE_CORS?.split(',') ?? []
});

if (!_env.success) {
    const formattedError = (_env as typeof _env & { success: false }).error.format();
    throw new InvalidEnvError(JSON.stringify(formattedError));
}

export const env = _env.data;