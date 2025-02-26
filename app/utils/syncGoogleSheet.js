import { google } from 'googleapis';
import prisma from "./db";
import { promises as fs } from 'fs';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'google-service-account.json');

async function getAuthClient() {
    const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: SCOPES,
    });

    return auth.getClient();
}

function formatDataForSheet(data) {
    if (!data.length) return [];
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((key) => row[key] ?? ''));
    return [headers, ...rows];
}

async function ensureSheetExists(sheets, spreadsheetId, sheetName) {
    try {
        const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetExists = sheetMetadata.data.sheets.some(sheet => sheet.properties.title === sheetName);

        if (!sheetExists) {
            console.log(`Sheet "${sheetName}" not found. Creating new sheet...`);
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: { title: sheetName }
                            }
                        }
                    ]
                }
            });
            console.log(`✅ Sheet "${sheetName}" created.`);
        }
    } catch (error) {
        console.error(`❌ Error checking/creating sheet "${sheetName}":`, error);
        throw error;
    }
}

export async function syncGoogleSheet(tableName) {
    try {
        const auth = await getAuthClient();
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = '1qL4w0gsJximHe8guNZ1iJTXNzK_VoiV00d3Af-Se3GE';
        const sheetName = `${tableName}s`;

        // Ensure the sheet exists before updating
        await ensureSheetExists(sheets, spreadsheetId, sheetName);

        // Fetch data from the database
        const tableMapping = {
            User: prisma.user.findMany(),
            Book: prisma.book.findMany(),
            Borrowing: prisma.borrowing.findMany(),
            Category: prisma.category.findMany(),
            Review: prisma.review.findMany(),
            CardCollection: prisma.cardCollection.findMany(),
        };

        if (!tableMapping[tableName]) return;

        const data = await tableMapping[tableName];
        const values = formatDataForSheet(data);
        if (values.length === 0) return;

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${sheetName}!A1`,
            valueInputOption: 'RAW',
            requestBody: { values },
        });

        console.log(`✅ Google Sheet updated for table: ${tableName}`);
    } catch (error) {
        console.error(`❌ Failed to sync ${tableName}:`, error);
    }
}
