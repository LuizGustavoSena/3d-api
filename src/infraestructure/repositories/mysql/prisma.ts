import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../../generated/prisma/client";
import { env } from "../../validations/zod/env";

const adapter = new PrismaPg({ 
    port: env.POSTGRES_PORT, 
    user: env.POSTGRES_USER, 
    password: env.POSTGRES_PASSWORD, 
    host: env.POSTGRES_HOST, 
    database: env.POSTGRES_DB 
});

const prisma = new PrismaClient({ adapter });

export { prisma };