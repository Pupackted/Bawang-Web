import { defineConfig } from "drizzle-kit";
import '@/backend/drizzle/env_config';

export default defineConfig({
  schema: './src/backend/drizzle/schema.ts',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  dialect: "postgresql",
  out: './drizzle_out'
});