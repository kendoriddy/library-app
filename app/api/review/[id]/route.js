import prisma from "../../utils/db";
import { authenticate } from "../../utils/middleware";

export async function GET(req, { params }) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(params.id) },
      include: { student: true, book: true }
    });

    if (!review) {
      return Response.json({ error: "Review not found" }, { status: 404 });
    }

    return Response.json(review, { status: 200 });
  } catch (error) {
    console.error("Error fetching review:", error);
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
    const { review } = body;

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(params.id) },
      data: { review },
      include: { student: true, book: true }
    });

    return Response.json({ message: "Review updated successfully", review: updatedReview }, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    await prisma.review.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
