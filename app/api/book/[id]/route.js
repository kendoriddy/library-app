import prisma from "../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function GET(req, { params }) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(params.id) },
      include: { categories: true, borrowings: true }
    });

    if (!book) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { title, description, author, quantity, categoryIds } = body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (author) updateData.author = author;
    if (quantity) updateData.quantity = quantity;
    if (categoryIds) {
      updateData.categories = {
        set: categoryIds.map(id => ({ id })),
      };
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return Response.json({ message: "Book updated successfully", book: updatedBook }, { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    await prisma.book.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "Book deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
