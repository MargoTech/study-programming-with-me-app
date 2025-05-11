import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

function extractJsonFromResponse(responseText) {
  const cleaned = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse JSON from GPT response:", err);
    throw new Error("Invalid JSON format from GPT");
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Body:", req.body);
  }
  next();
});

app.post("/api/generate-questions", async (req, res) => {
  const { topic } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are API, give test questions with 5 answers and one right.",
        },
        {
          role: "user",
          content: `Generate 5 multiple-choice questions about "${topic}" in JSON format. Each question should have: question, options (array of 4), and answer (index of correct option) in JSON format:
          [{ question, options: [string], answer: number}].`,
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.data.choices[0].message.content;

    let questions;
    try {
      questions = extractJsonFromResponse(responseText);
    } catch (err) {
      return res.status(500).json({ error: "Failed to generate questions" });
    }

    res.json(questions);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET"],
//   })
// );

// const mockQuestions = {
//   html: [
//     {
//       question: "What is HTML?",
//       options: ["Markup", "Style", "Script", "Protocol"],
//       answer: 0,
//     },
//     {
//       question: "What tag creates a hyperlink?",
//       options: ["<link>", "<a>", "<href>", "<img>"],
//       answer: 1,
//     },
//   ],
//   css: [
//     {
//       question: "What does CSS stand for?",
//       options: [
//         "Colorful Style Syntax",
//         "Cascading Style Sheets",
//         "Computer Style Sheets",
//         "Creative Style Sheet",
//       ],
//       answer: 1,
//     },
//   ],
// };

// const questions = mockQuestions[topic.toLowerCase()];

//   if (!questions) {
//     return res.status(404).json({
//       error: `Topic '${topic}' not found`,
//       availableTopics: Object.keys(mockQuestions),
//     });
//   }

//   res.json(questions);
// });
