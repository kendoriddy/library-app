import prisma from "../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function PUT(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const cardCollection = await prisma.cardCollection.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!cardCollection) {
      return Response.json({ error: "cardCollection record not found" }, { status: 404 });
    }
    const body = await req.json();
    
    await prisma.cardCollection.update({
      where: { id: parseInt(params.id) },
      data: {
      studentId: body.studentId,
      collectionDate: body.collectionDate ? new Date(body.collectionDate) : undefined,
      is_collected: body.is_collected
      },
    });

    return Response.json({ message: "card collection updated successfully" }, { status: 200 });
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

    await prisma.cardCollection.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "cardCollection record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cardCollection record:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
