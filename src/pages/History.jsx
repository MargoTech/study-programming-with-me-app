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

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <select
          className="border rounded px-3 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All topics</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>
      </div>

      <button
        onClick={clearHistory}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        🗑 Clear History
      </button>

      {/* History list */}
      <ul className="space-y-4">
        <AnimatePresence>
          {filteredHistory.map((item, index) => {
            const percentage = Math.round((item.score / item.total) * 100);
            const color =
              percentage >= 70
                ? "text-green-600"
                : percentage >= 40
                ? "text-yellow-600"
                : "text-red-600";

            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white rounded shadow border flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">Topic: {item.topic}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(item.date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${color}`}>
                    {item.score} / {item.total}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default QuizHistory;
