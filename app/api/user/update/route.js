import prisma from "../../utils/db";
import { authenticate } from "../../../utils/middleware";
import { hashPassword } from "../../utils/auth";

export async function PUT(req) {
  try {
    // Authenticate user
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const userId = auth.userId;
    const body = await req.json();
    const { name, password,studentId,department } = body;

    if (!name && !password) {
      return Response.json({ error: "Provide at least one field to update" }, { status: 400 });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = await hashPassword(password);
    if(department) updateData.department = department;

  
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, studentId: true },
    });

    return Response.json({ message: "Profile updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
