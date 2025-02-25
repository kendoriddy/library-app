import prisma from "@/utils/db";

export async function GET(req, { params }) {
  try {
    const bookId = parseInt(params.bookId);
    if (isNaN(bookId)) {
      return Response.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const borrowings = await prisma.borrowing.findMany({
      where: { bookId },
      include: {
        student: { select: { id, name, email, studentId } },
      },
    });

    return Response.json(borrowings, { status: 200 });
  } catch (error) {
    console.error("Error fetching borrowings for book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
