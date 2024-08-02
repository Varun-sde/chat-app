import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: "sk-proj-YA1Ug2l7VPWyhPmVCsNPT3BlbkFJOfUQQYe7D4ekprwmibTT",
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            stream: true,
            messages: [...messages],
        });

        const stream = await OpenAIStream(response);

        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Error in POST /api/chat:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}