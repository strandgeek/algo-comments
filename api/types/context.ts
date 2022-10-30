import { Account, PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";

export interface Context extends ExpressContext {
  prisma: PrismaClient
  me: Account | null
}
