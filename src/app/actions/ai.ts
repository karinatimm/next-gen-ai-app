"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAI(userRequest: string): Promise<string> {
  try {
    const prompt = `
Please answer strictly in Markdown format.
- Use bullet lists for enumerations.
- Use two spaces at the end of lines for line breaks inside list items.
- Use bold for important terms or headings if applicable.
- Separate list items by a blank line.
- For regular text, use paragraphs with proper Markdown syntax.

Here is the user question or prompt:

${userRequest}
    `.trim();

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    });

    return (
      chatCompletion.choices?.[0]?.message?.content || "Error: empty response"
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("OpenAI error:", error.message);
      return "OpenAI request error";
    }
    return "Unknown error";
  }
}
