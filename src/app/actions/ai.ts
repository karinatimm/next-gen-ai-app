"use server";

import db from "@/utils/db";
import Query from "models/query";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const runAI = async (userRequest: string): Promise<string> => {
  try {
    const prompt = `${userRequest}`.trim();

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
};

const saveQuery = async (
  template: object,
  email: string,
  query: string,
  content: string
): Promise<{ ok: boolean }> => {
  try {
    await db();

    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });

    await newQuery.save();

    return {
      ok: true,
    };
  } catch (err) {
    console.error("MongoDB saveQuery error:", err);
    return { ok: false };
  }
};

const getQueries = async (email: string, page: number, pageSize: number) => {
  try {
    await db();

    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });

    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    const plainQueries = JSON.parse(JSON.stringify(queries));

    return {
      queries: plainQueries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (err) {
    console.error("MongoDB getQueries error:", err);
    return {
      queries: [],
      totalPages: 0,
    };
  }
};

const usageCount = async (email: string) => {
  await db();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const result = await Query.aggregate([
    {
      $match: {
        email: email,
        $expr: {
          $and: [
            { $eq: [{ $year: "$createdAt" }, currentYear] },
            { $eq: [{ $month: "$createdAt" }, currentMonth] },
          ],
        },
      },
    },
    {
      $project: {
        wordCount: {
          $size: {
            $split: [{ $trim: { input: "$content" } }, " "],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalWords: { $sum: "$wordCount" },
      },
    },
  ]);

  return result.length > 0 ? result[0].totalWords : 0;
};

export { runAI, saveQuery, getQueries, usageCount };
