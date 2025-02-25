import prisma from "@/utils/db";

export async function GET(req, { params }) {
  try {
    const bookId = parseInt(params.bookId);
    if (isNaN(bookId)) {
      return Response.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { bookId },
      include: {
        student: { select: { id, name, email, studentId } },
      },
    });

    return Response.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews for book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
