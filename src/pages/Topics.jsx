import { useNavigate } from "react-router-dom";

const topics = [
  {
    id: "html",
    title: "HTML for beginners",
    image: "",
  },
  { id: "css", title: "Basic CSS" },
  { id: "js", title: "Basic JavaScript" },
];

const Topics = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500"
          onClick={() => navigate(`/learn/${topic.id}`)}
        >
          <img
            src={topic.image}
            alt={topic.title}
            className="w-full h-40 object-cover rounded-t-xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {topic.title}
          </h2>
          <p className="text-gray-600 text-sm">Click to start learning</p>
        </div>
      ))}
    </div>
  );
};

export default Topics;
