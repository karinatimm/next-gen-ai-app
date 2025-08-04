"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runAI(userRequest: string): Promise<string> {
  try {
    const prompt = `
You are a senior technical writer and expert in Markdown formatting.

Write a **technical article** based on the topic below. Use clean **Markdown** with the following formatting:

- Use proper headings: ## for main, ### for subsections
- Use bullet lists and numbered steps where needed
- Include **code blocks** (fenced with triple backticks) with language specified, e.g., \`\`\`tsx
- Keep the explanation concise and useful
- Use short paragraphs, no fluff

### Topic:

${userRequest}

Make sure to include **code examples** if the topic is related to programming or frontend.
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
      top_p: 0.95,
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
