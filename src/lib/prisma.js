import { PrismaClient } from "@prisma/client";
import { withPg } from "@prisma/adapter-pg"; // لازم تثبت الباكدج دي

const globalForPrisma = globalThis;

const adapter = withPg(process.env.DATABASE_URL);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
