import prisma from "../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: { categories: true, borrowings: true }
    });

    return Response.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { title, description, author, quantity, categoryIds } = body;

    if (!title || !author || !quantity || !categoryIds?.length) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const book = await prisma.book.create({
      data: {
        title,
        description,
        author,
        quantity,
        categories: {
          connect: categoryIds.map(id => ({ id })),
        },
      },
    });

    return Response.json({ message: "Book created successfully", book }, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
