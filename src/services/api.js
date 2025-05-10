const API_BASE_URL = "http://localhost:3001/api";

export const fetchQuestionsByTopic = async (topic) => {
  const response = await fetch("http://localhost:3001/api/generate-questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error("Failed to load questions");
  }

  return response.json();
};
