import { Hono } from "hono";
import type { PrismaClient } from "./generated/prisma/client";
import withPrisma from "./lib/prisma";
import prismaConfig from "../prisma.config";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
};

const app = new Hono<ContextWithPrisma>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// user get endpoint
app.get("/users", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return c.json({ users });
});

export default app;
