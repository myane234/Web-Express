import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export async function AskAI(question: string) {
    const apiKey = process.env.GoogleAPIKey;
    try {

    
    if (!apiKey) {
        throw new Error('Google API Key tidak ditemukan');
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
        model: "gemini-2.0-flash" // MODEL YANG VALID 2025
    });

    const hasil = await model.generateContent(question);

    return hasil.response.text();
} catch (err) {
    console.error('Error in AskAI:', err);
    throw err;
}
}
