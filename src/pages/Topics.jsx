import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const topics = [
  {
    id: "html",
    title: "HTML for beginners",
    image: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    gradient: "from-orange-100 to-yellow-200",
  },
  {
    id: "css",
    title: "Basic CSS",
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    gradient: "from-blue-100 to-indigo-200",
  },
  {
    id: "js",
    title: "Basic JavaScript",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    gradient: "from-green-100 to-green-200",
  },
];

export default function Topics() {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-800">
        🚀 Choose a Topic to Start
      </h2>

      <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/learn/${topic.id}`)}
            className={`cursor-pointer bg-gradient-to-br ${topic.gradient} 
              rounded-3xl shadow-xl p-8 flex flex-col items-center
              hover:shadow-2xl transition-all`}
          >
            <div className="w-28 h-28 mb-6 rounded-full bg-white/70 flex items-center justify-center shadow-inner">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-800">
              {topic.title}
            </h2>
            <p className="text-sm text-center text-gray-500 mt-3">
              Click to start learning
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
