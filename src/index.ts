import { Hono } from "hono";
import type { PrismaClient } from "./generated/prisma/client";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const app = new Hono<ContextWithPrisma>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
