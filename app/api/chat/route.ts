// app/api/chat/route.ts
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, systemPrompt } = await req.json();

        // Get the last user message
        const lastUserMessage = messages
            .filter((msg: any) => msg.role === 'user')
            .pop()?.content;

        if (!lastUserMessage) {
            return new Response(JSON.stringify({ 
                error: "No user message found" 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { text } = await generateText({
            model: google("gemini-2.0-flash-exp"),
            system: systemPrompt || "You are a helpful, funny, semi-sarcastic, semi-sardonic, AI assistant that motivates the user to stop procrastinating and get things done.",
            prompt: lastUserMessage,
        });

        return new Response(JSON.stringify({ 
            message: text 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error("Error in API route:", error);
        return new Response(JSON.stringify({ 
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "Unknown error"
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}