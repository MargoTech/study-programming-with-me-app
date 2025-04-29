import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

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
    }
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

//   try {
//     const response = await fetch(
//       `https://api.example.com/data?api_key=${API_KEY}`
//     );

    if (!questions) {
        return res.status(404).json({ error: "Topic not found" });
      }

    res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
