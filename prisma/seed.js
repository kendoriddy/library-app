import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = ["Fiction", "Science", "History", "Technology", "Philosophy"];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Create categories
    const categoryRecords = await Promise.all(
      categories.map(async (name) =>
        prisma.category.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    // Create books
    for (let i = 0; i < 20; i++) {
      const title = faker.lorem.words(3);
      const image = `https://picsum.photos/seed/${i}/200/300`; // Random book covers
      const description = faker.lorem.sentences(2);
      const author = faker.person.fullName();
      const quantity = faker.number.int({ min: 1, max: 10 });

      // Randomly assign 1-2 categories
      const randomCategories = faker.helpers.arrayElements(categoryRecords, 2);

      await prisma.book.create({
        data: {
          title,
          image,
          description,
          author,
          quantity,
          categories: {
            connect: randomCategories.map((cat) => ({ id: cat.id })),
          },
        },
      });
    }

    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
