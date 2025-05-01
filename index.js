import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const mockQuestions = {
  html: [
    {
      question: "What is HTML?",
      options: ["Markup", "Style", "Script", "Protocol"],
      answer: 0,
    },
    {
      question: "What tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<img>"],
      answer: 1,
    },
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Colorful Style Syntax",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style Sheet",
      ],
      answer: 1,
    },
  ],
};

app.get("/api/data/:topic", (req, res) => {
  const { topic } = req.params;

  const questions = mockQuestions[topic.toLowerCase()];

  if (!questions) {
    return res.status(404).json({
      error: `Topic '${topic}' not found`,
      availableTopics: Object.keys(mockQuestions),
    });
  }

  res.json(questions);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
