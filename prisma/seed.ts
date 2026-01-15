import {PrismaClient, Prisma } from "../src/generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    // clear existing data
    await prisma.user.deleteMany({});
    await prisma.post.deleteMany({});

    // create users
    const alice = await prisma.user.create({
        data: {
            email: "alice@example.com",
            name: "Alice",
        }
    });

    const bob = await prisma.user.create({
        data: {
            email: "bob@example.com",
            name: "Bob",
        }
    });

    // create posts
    // alice's posts
    await prisma.post.createMany({
        data: [
            {
                title: "Join the Prisma discord",
                content: "https://pris.ly/discord",
                published: true,
                authorId: alice.id,
            },
            {
                title: "Prisma  on YouTube",
                content: "https://pris.ly/youtube",
                authorId: alice.id,
            }
        ]
    })

    // bob's posts
    await prisma.post.create({
        data: {
            title: "Follow Prisma on Twitter",
            content: "https://www.twitter.com/prisma",
            published: true,
            authorId: bob.id
        }
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })