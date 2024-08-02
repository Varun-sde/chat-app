import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    apiKey: 'sk-proj-YA1Ug2l7VPWyhPmVCsNPT3BlbkFJOfUQQYe7D4ekprwmibTT'
});

const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            stream: true,
            messages: [...messages]
        });

        const stream = await OpenAIStream(response);

        // send the stream as a response to our client / frontend
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error in POST /api/chat:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
