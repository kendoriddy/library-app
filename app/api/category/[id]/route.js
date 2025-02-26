import prisma from "../../../utils/db";
import { authenticate } from "../../../utils/middleware";

export async function GET(req, { params }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
      include: { books: true }
    });

    if (!category) {
      return Response.json({ error: "category not found" }, { status: 404 });
    }

    return Response.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
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
    const { name } = body;

    const updateData = {};
    if (name) updateData.name = name; 

    const updatedcategory = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return Response.json({ message: "category updated successfully", category: updatedcategory }, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    await prisma.category.delete({ where: { id: parseInt(params.id) } });

    return Response.json({ message: "category deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
