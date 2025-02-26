import prisma from "../../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function GET(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(auth.userId) },
       include: { 
        reviews: true,
        borrowings: {
          include:{book:true}
        },
        cardCollection:true

      } 
    });

    if (!user) {
      return Response.json({ error: "user not found" }, { status: 404 });
    }

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
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
    const { user } = body;

    const updateduser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: { user },
      include: { student: true, book: true }
    });

    return Response.json({ message: "user updated successfully", user: updateduser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    await prisma.user.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "user deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
