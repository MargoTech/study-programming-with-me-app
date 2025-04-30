const API_BASE_URL = "http://localhost:3001/api";

export const fetchQuestionsByTopic = async (topic) => {
  const response = await fetch(`${API_BASE_URL}/data/${topic}`);
  if (!response.ok) {
    throw new Error("Failed to load questions");
  }
  return response.json();
};
