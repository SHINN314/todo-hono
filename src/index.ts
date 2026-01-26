import { Hono } from "hono";
import { getPrisma } from "./lib/prisma";

type HonoEnv = {
  Bindings: {
    DATABASE_URL: string;
  };
};

const app = new Hono<HonoEnv>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// user get endpoint
app.get("/users", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return c.json({ users });
});

export default app;
