import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("quizHistory");
    if (saved) {
      setHistory(JSON.parse(saved).reverse());
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("quizHistory");
    setHistory([]);
  };

  const filteredHistory =
    filter === "all"
      ? history
      : history.filter((item) => item.topic === filter);

  if (history.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No quiz history found.</p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📚 Quiz History</h2>

      <button
        onClick={clearHistory}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        🗑 Clear History
      </button>

      {/* History list */}
      <ul className="space-y-4">
        <AnimatePresence>
          {history.map((item, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded shadow border flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">Topic: {item.topic}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(item.date).toLocaleString()}
                </p>
                {item.percentage && (
                  <p className="text-sm text-gray-600">
                    Score: {item.percentage}% · Time: {item.duration || 0}s
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  {item.score} / {item.total}
                </p>
              </div>
            </li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default QuizHistory;
