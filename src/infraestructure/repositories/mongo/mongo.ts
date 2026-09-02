import mongoose from "mongoose";
import "dotenv/config";
import { env } from "../../validations/zod/env";

export async function connectMongo(): Promise<void> {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(env.MONGO_URL);
}
