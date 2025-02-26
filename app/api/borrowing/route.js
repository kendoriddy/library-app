export async function GET() {
  try {
    const books = await prisma.borrowing.findMany({
      include: { books: true, users: true }
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

        const { bookId, studentId } = await req.json();

        if (!bookId || !studentId) {
            return Response.json({ error: "Book ID and Student ID are required" }, { status: 400 });
        }

        // Check if student already has borrowed this book
        const existingBorrowing = await prisma.borrowing.findFirst({
            where: {
                studentId,
                bookId,
                returnDate: null, // Only check non-returned books
            },
        });

        if (existingBorrowing) {
            return Response.json(
                { error: "You have already borrowed this book" },
                { status: 400 }
            );
        }

        const book = await prisma.book.findUnique({ where: { id: bookId } });

        if (!book || book.quantity <= 0) {
            return Response.json({ error: "Book not available" }, { status: 400 });
        }

        const borrowing = await prisma.borrowing.create({
            data: {
                studentId,
                bookId,
            },
        });

        await prisma.book.update({
            where: { id: bookId },
            data: { quantity: book.quantity - 1 },
        });

        return Response.json({ message: "Book borrowed successfully", borrowing }, { status: 201 });
    } catch (error) {
        console.error("Error borrowing book:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
