import mongoose from "mongoose";
import "dotenv/config";
import { env } from "../../validations/zod/env";

export async function connectMongo(): Promise<void> {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(`mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/?authSource=admin`);
}
