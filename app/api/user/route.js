import prisma from "../../utils/db";
import { authenticate } from "../../utils/middleware";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { 
        reviews: true,
        borrowings: {
          include:{book:true}
        },
        cardCollection:true

      }
    });

    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
