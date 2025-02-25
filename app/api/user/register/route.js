import prisma from "@/utils/db";
import { hashPassword, generateToken } from "@/utils/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, studentId } = body;

    if (!name || !email || !password || !studentId) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { studentId }] },
    });

    if (existingUser) {
      return Response.json({ error: "Email or Student ID already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        studentId,
      },
    });

    // Generate JWT token
    const token = generateToken(newUser);

    return Response.json(
      { message: "User registered successfully", token, user: { id: newUser.id, name, email, studentId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
