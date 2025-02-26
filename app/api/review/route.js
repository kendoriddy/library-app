import prisma from "../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: { 
        student: true,
        book: true 
      }
    });

    return Response.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
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
    const { review, bookId } = body;

    if (!review || !bookId) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        review,
        bookId,
        studentId: auth.user.id
      },
      include: {
        student: true,
        book: true
      }
    });

    return Response.json({ message: "Review created successfully", review: newReview }, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
