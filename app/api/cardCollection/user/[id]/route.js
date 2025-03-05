import prisma from "../../../../utils/db";

export async function GET(req, { params }) {
  try {
    const userId = parseInt(params.userId);
    if (isNaN(userId)) {
      return Response.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const borrowings = await prisma.borrowing.findMany({
      where: { studentId: userId },
      include: {
        book: { select: { id, title, author } },
      },
    });

    return Response.json(borrowings, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrowings for user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
