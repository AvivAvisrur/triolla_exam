import { PrismaClient } from "@prisma/client";

// Add `global` declaration for TypeScript (needed if using TypeScript)
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single instance of PrismaClient and attach it to the `global` object in development
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
