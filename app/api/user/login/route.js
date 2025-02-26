import prisma from "../../../utils/db";
import { comparePassword, generateToken } from "../../../utils/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, password } = body;

    if (!studentId || !password) {
      return Response.json({ error: "studentId and password are required" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { studentId } });

    if (!user) {
      return Response.json({ error: "Invalid studentId or password" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return Response.json({ error: "Invalid studentId or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken(user);

    return Response.json(
      { message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, studentId: user.studentId } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
