import { PrismaClient } from "@prisma/client";
import { syncGoogleSheet } from "../utils/syncGoogleSheet";

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Middleware to sync Google Sheets on database changes
prisma.$use(async (params, next) => {
    const result = await next(params);

    // Ensure `params.model` exists (it won't exist for raw queries)
    if (params.model && ["create", "update", "delete"].includes(params.action)) {
        try {
            await syncGoogleSheet(params.model);
        } catch (error) {
            console.error(`Failed to sync Google Sheet for ${params.model}:`, error);
        }
    }

    return result;
});

export default prisma;
