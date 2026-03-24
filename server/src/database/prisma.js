import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__prismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prismaClient = prisma;
}

export async function connectPrisma() {
  await prisma.$connect();
  console.log("[Database] Prisma connected");
  return prisma;
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
