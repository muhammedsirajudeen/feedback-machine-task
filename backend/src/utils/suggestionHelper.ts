import { envConfig } from "../config/envConfig";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Replace with your actual API key
const API_KEY = envConfig.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateSuggestionsAi(prompt: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text() as string;

    // Clean and split CSV string into array
    const suggestions = text
        .replace(/\n/g, '')               // Remove newlines
        .split(',')
        .map(s => s.trim())               // Trim whitespace
        .filter(s => s.length > 0);       // Remove empty items

    return suggestions;
}

