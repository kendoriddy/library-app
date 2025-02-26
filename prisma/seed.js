import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = ["Fiction", "Science", "History", "Technology", "Philosophy"];
const departmentList = [
  "DEPARTMENT OF AGRICULTURAL ECONOMICS",
  "DEPARTMENT OF AGRONOMY",
  "DEPARTMENT OF FOREST RESOURCES MANAGEMENT",
  "DEPARTMENT OF ARABIC AND ISLAMIC STUDIES",
  "DEPARTMENT OF COMMUNICATION AND LANGUAGE ARTS",
  "DEPARTMENT OF EUROPEAN STUDIES",
  "DEPARTMENT OF HISTORY",
  "DEPARTMENT OF THEATRE ART",
  "DEPARTMENT OF BIOCHEMISTRY",
  "DEPARTMENT OF EPIDEMIOLOGY, MEDICAL STATISTICS AND ENVIRONMENTAL HEALTH (EMSEH)",
  "DEPARTMENT OF HEALTH POLICY AND MANAGEMENT",
  "DEPARTMENT OF HEALTH PROMOTION AND EDUCATION",
  "INSTITUTE OF ADVANCED MEDICAL RESEARCH AND TRAINING",
  "DEPARTMENT OF MEDICINE",
  "DEPARTMENT OF OBSTETRICS AND GYNAECOLOGY",
  "DEPARTMENT OF PHYSIOLOGY",
  "DEPARTMENT OF PREVENTIVE MEDICINE AND PRIMARY CARE",
  "DEPARTMENT OF PSYCHIATRY",
  "DEPARTMENT OF ADULT EDUCATION",
  "DEPARTMENT OF GUIDANCE AND COUNSELLING",
  "DEPARTMENT OF HUMAN KINETICS AND HEALTH EDUCATION",
  "DEPARTMENT OF PHARMACEUTICS AND INDUSTRIAL PHARMACY",
  "DEPARTMENT OF BOTANY",
  "DEPARTMENT OF GEOLOGY",
  "DEPARTMENT OF MICROBIOLOGY",
  "DEPARTMENT OF ZOOLOGY",
  "DEPARTMENT OF ECONOMICS",
  "DEPARTMENT OF GEOGRAPHY",
  "DEPARTMENT OF SOCIOLOGY",
  "DEPARTMENT OF ELECTRICAL AND ELECTRONIC ENGINEERING",
  "DEPARTMENT OF MECHANICAL ENGINEERING",
  "DEPARTMENT OF INDUSTRIAL AND PRODUCTION ENGINEERING",
  "DEPARTMENT OF VETERINARY PHYSIOLOGY, BIOCHEMISTRY AND PHARMACOLOGY"
];
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
