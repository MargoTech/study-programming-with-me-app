import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lessons = {
    html: {
      title: "HTML Basics",
      content:
        "HTML (HyperText Markup Language) is used to structure content on the web...",
    },
    css: {
      title: "CSS Basics",
      content:
        "CSS (Cascading Style Sheets) controls the look and layout of web pages...",
    },
    js: {
      title: "JavaScript Basics",
      content:
        "JavaScript is a programming language that lets you make web pages interactive...",
    },
  };

  if (!lessons[id]) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-600">404: Not founded</h2>
      </div>
    );
  }

  const { title, content } = lessons[id];

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => navigate(-1)}>Home</button>
      <h1 className="text-2xl font-bold mb-4">Topic: {id.toUpperCase()}</h1>
      <h2 className="text-xl font-semibold mb-2">{lessons[id]?.title}</h2>
      <p className="text-gray-700 mb-6">{lessons[id]?.content}</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow"
        onClick={() => navigate(`/quiz/${id}`)}
      >
        Test
      </button>
    </motion.div>
  );
};

export default Learn;
