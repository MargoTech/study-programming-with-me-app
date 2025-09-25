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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const MOCK_QUESTIONS = [{ question: "Test?", options: ["A", "B"], answer: 0 }];

try {
  const questions = JSON.parse(text);
  if (!Array.isArray(questions) || !questions.length) throw new Error();
  res.json(questions);
} catch {
  res
    .status(500)
    .json({
      error: "Failed to generate, returning fallback",
      fallback: MOCK_QUESTIONS,
    });
}
