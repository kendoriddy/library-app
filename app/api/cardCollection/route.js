import {prisma} from "../../utils/db"
import {authenticate} from "../../utils/middleware"
export async function GET() {
  try {
    const cardCollection = await prisma.cardCollection.findMany({
      include: {  student: true }
    });

    return Response.json(cardCollection, { status: 200 });
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

        const { collectionDate, studentId } = await req.json();

        if (!bookId || !studentId) {
            return Response.json({ error: "collection Date and Student ID are required" }, { status: 400 });
        }

        // Check if student already has requested card collection
        const existingcardCollection = await prisma.cardCollection.findFirst({
            where: {
                studentId,
            },
        });

        if (existingcardCollection) {
            return Response.json(
                { error: "You have requested card collection" },
                { status: 400 }
            );
        }
 

        const cardCollection = await prisma.cardCollection.create({
            data: {
                studentId,
                collectionDate,
            },
        });

      

        return Response.json({ message: "card collection created successfully", cardCollection }, { status: 201 });
    } catch (error) {
        console.error("Error cardCollection book:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}
