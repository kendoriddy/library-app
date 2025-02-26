import prisma from "../../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function PUT(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const borrowing = await prisma.borrowing.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!borrowing) {
      return Response.json({ error: "Borrowing record not found" }, { status: 404 });
    }

    await prisma.borrowing.update({
      where: { id: parseInt(params.id) },
      data: { returnDate: new Date() },
    });

    await prisma.book.update({
      where: { id: borrowing.bookId },
      data: { quantity: { increment: 1 } },
    });

    return Response.json({ message: "Book returned successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error returning book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    await prisma.borrowing.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "Borrowing record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting borrowing record:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
