const API_BASE_URL = "http://localhost:3001/api";

export const fetchQuestionsByTopic = async (topic) => {
  console.log("📦 Sending topic to backend:", topic);

  try {
    const response = await fetch(
      "http://localhost:3001/api/generate-questions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      }
    );
    const data = await response.json();

    console.log("🧠 Response from backend:", data);

    if (Array.isArray(data)) {
      return data;
    }

    if (data?.fallback) {
      console.warn("⚠️ Using fallback questions");
      return data.fallback;
    }
    throw new Error("Invalid data format");
  } catch (err) {
    console.error("🚨 Fetch failed:", err.message);
    return [
      {
        question: "Local Fallback: Which tag creates a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
      },
    ];
  }
};
