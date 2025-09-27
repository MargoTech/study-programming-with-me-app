import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/generate-questions", async (req, res) => {
  const { topic } = req.body;

  const MOCK_QUESTIONS = [
    { question: "Test?", options: ["A", "B"], answer: 0 },
    { question: "Fallback: Next?", options: ["Yes", "No"], answer: 1 },
  ];

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Create 5 multiple-choice quiz questions about ${topic}.
    Format strictly as a JSON array:
    [
      {"question":"...","options":["...","..."],"answer":0}
    ]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;
    const questions = JSON.parse(text);

    if (!Array.isArray(questions) || !questions.length) {
      throw new Error("Invalid response");
    }
    res.json(questions);
  } catch (err) {
    console.error("❌ OpenAI Error:", err.message);
    res.status(500).json({
      error: "Failed to generate from OpenAI — using fallback",
      fallback: MOCK_QUESTIONS,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
