import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
    // لو هتستخدم Accelerate أو Adapter ممكن تضيف هنا:
    // accelerateUrl: process.env.ACCELERATE_URL,
    // أو adapter: withAccelerate(...)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
