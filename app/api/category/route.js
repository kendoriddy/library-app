export async function POST(req) {
  try {
    const auth = authenticate(req);
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name
      },
    });

    return Response.json({ message: "category created successfully", category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
