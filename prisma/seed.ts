import {PrismaClient, Prisma } from "../src/generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

const userData: Prisma.UserCreateInput[] = [
    {
        email: "example@gmail.com",
        name: "hgoe1",
        posts: {
            create: [
                {
                    title: "Join the Prisma Discord",
                    content: "https://pris.ly/discord",
                    published: true,
                },
                {
                    title: "Prisma on YouTube",
                    content: "https://pris.ly/youtube",
                }
            ]
        }
    },
    {
        email: "bob@prisma.io",
        name: "Bob",
        posts: {
            create: [
                {
                    title: "Follow Prisma on Twitter",
                    content: "https://www.twitter.com/prisma",
                    published: true,
                }
            ]
        }
    }
];