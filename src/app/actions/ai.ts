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
    // Connect to the MongoDB database
    await db();

    // Create a new Query document instance with provided data
    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });

    // Save the new document to the database
    await newQuery.save();
    // Return success result
    return {
      ok: true,
    };
  } catch (err) {
    console.error("MongoDB saveQuery error:", err);
    // Return failure result
    return { ok: false };
  }
};

// email: filters queries by this user
// page: the current page number (for pagination)
// pageSize: how many queries to return per page
// Функция для получения списка запросов пользователя из базы данных с пагинацией
const getQueries = async (email: string, page: number, pageSize: number) => {
  try {
    // connection to the MongoDB database
    await db();

    // Calculate how many documents to skip based on the current page
    // For example: page 2 with pageSize 10 → skip = 10
    const skip = (page - 1) * pageSize;
    // Count the total number of queries made by this user
    const totalQueries = await Query.countDocuments({ email });

    // Fetch the user's queries from the database:
    // - Filter by email
    // - Skip the appropriate number of results
    // - Limit the number of results per page
    // - Sort the results by creation date (newest first)
    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    // An array of plain JavaScript objects.
    const plainQueries = JSON.parse(JSON.stringify(queries));

    // Return the queries and total number of pages
    return {
      queries: plainQueries,
      totalPages: Math.ceil(totalQueries / pageSize), // Round up to ensure all results are covered
    };
  } catch (err) {
    console.error("MongoDB getQueries error:", err);
    return {
      queries: [],
      totalPages: 0,
    };
  }
};

// Функция считает общее количество слов, написанных пользователем
// с указанным email,
// в поле content всех записей модели Query, созданных в текущем месяце
// и году.
const usageCount = async (email: string) => {
  await db();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Агрегация в MongoDB: поиск и подсчёт слов
  const result = await Query.aggregate([
    {
      // Шаг 1: фильтруем записи по email и дате (текущий год и месяц)
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
      // Шаг 2: проецируем (вытаскиваем) количество слов в каждой записи
      $project: {
        wordCount: {
          $size: {
            $split: [{ $trim: { input: "$content" } }, " "],
          },
        },
      },
    },
    {
      // Шаг 3: группируем все записи (в одну группу) и суммируем все слова
      $group: {
        _id: null, // означает, что все документы складываются в одну группу
        totalWords: { $sum: "$wordCount" }, // суммируем все значения wordCount
      },
    },
  ]);

  // Возвращаем общее количество слов, либо 0, если записей нет
  return result.length > 0 ? result[0].totalWords : 0;
};

export { runAI, saveQuery, getQueries, usageCount };
