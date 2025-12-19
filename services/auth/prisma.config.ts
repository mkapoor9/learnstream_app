import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./src/db/schema.prisma",

  migrate: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },

  client: {
    adapter: "prisma",                
    url: process.env.DATABASE_URL!,
  },
});
