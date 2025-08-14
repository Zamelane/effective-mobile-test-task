import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true })

const envSchema = z.object({
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),

  DB_HOST: z.string().min(1),
  DB_PORT: z.number().min(1).max(65535),

  DB_NAME: z.string().min(1),
})

const envParsed = envSchema.safeParse({
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),

  DB_NAME: process.env.DB_NAME,
})

if (!envParsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(envParsed.error));
  throw new Error('Invalid environment variables');
}

export const env = envParsed.data