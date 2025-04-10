// lib/prisma.ts
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const getPrisma = () => {
  const client = new PrismaClient();

  if (process.env.DATABASE_URL?.startsWith("prisma+postgres")) {
    return client.$extends(withAccelerate());
  }
  return client;
};

export const prisma = globalForPrisma.prisma || getPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
