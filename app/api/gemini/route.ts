import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(req: Request) {
    const { name } = await req.json(); // Extract the title from the request body

    if (!name || typeof name !== 'string') {
        return NextResponse.json({ error: "Give your list a name!" }, { status: 500 });
        
    }
    let result: any = null;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Gemini API key not found!" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `give sentence-long description for shopping list titled '${name}'`;

    result = await model.generateContent(prompt);

    return NextResponse.json({message: result.response.text()}); // Send the API response back to the client
}