import "dotenv/config"
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

console.log("DB URL →", process.env.DATABASE_URL);

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: {
    rejectUnauthorized: false,  // REQUIRED FOR NEON
  },
});

const adapter = new PrismaPg(pool);

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });
}

const prisma = globalForPrisma.prisma;

export default prisma;
