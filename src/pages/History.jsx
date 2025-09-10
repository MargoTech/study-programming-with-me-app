import { useEffect, useState } from "react";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("quizHistory");
    if (saved) {
      setHistory(JSON.parse(saved).reverse());
    }
  }, []);

  if (history.length === 0) {
    return <p className="text-center text-gray-500">No quiz history found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📚 Quiz History</h2>
      <ul className="space-y-4">
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
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">
                {item.score} / {item.total}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
