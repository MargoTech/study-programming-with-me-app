import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { html } from "framer-motion/client";

dotenv.config();

const PORT = process.env.PORT || 3001;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("ERROR: set OPENAI_API_KEY in server/.env");
  process.exit(1);
}

const client = new OpenAI({ apiKey: OPENAI_KEY });

const MOCK_QUESTIONS = {
  html: [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "Home Tool Markup Language"],
      answer: 0,
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<p>", "<div>"],
      answer: 0,
    },
  ],
};

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});
