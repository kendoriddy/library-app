import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const currentDate = new Date();
    const reminderDate = new Date();
    reminderDate.setDate(currentDate.getDate() + 3);

    const borrowings = await prisma.borrowing.findMany({
      where: {
        returnDate: {
          gte: currentDate, // Return date should be in the future
          lte: reminderDate, // Within the next 3 days
        },
      },
      include: {
        student: true,
        book: true,
      },
    });

    return new Response(JSON.stringify(borrowings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
