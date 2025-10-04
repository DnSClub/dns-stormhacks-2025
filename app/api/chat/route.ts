import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Handles the POST request for the chat API.
 * 
 * This function processes incoming chat messages and a system prompt,
 * then streams a response using the specified model.
 * 
 * @param req - The incoming request object containing chat messages and an optional system prompt.
 * @returns A response stream containing the generated chat response.
 * @throws {Response} Returns a 500 Internal Server Error response if an error occurs during processing.
 */
export async function POST(req: Request) {
    try {
        const {
            messages,
            systemPrompt,
        }: { messages: any[]; systemPrompt?: string } = await req.json();

        const result = await streamText({
            model: google("gemini-2.0-flash-exp"),
            system: systemPrompt || "You are a helpful AI assistant that provides clear, concise, and friendly responses.",
            messages: messages,
        });

        // Use the correct method for your SDK version
        return result.toDataStreamResponse?.() || result.toResponse?.() || new Response(result.stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
        
    } catch (error) {
        console.error("Error in API route:", error);
        return new Response(JSON.stringify({ 
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "Unknown error"
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}