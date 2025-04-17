import { useNavigate } from "react-router-dom";

const topics = [
  {
    id: "html",
    title: "HTML for beginners",
    image: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
  },
  { id: "css", 
    title: "Basic CSS", 
    image:"https://cdn-icons-png.flaticon.com/512/732/732190.png",
    {
      id: "js",
      title: "Basic JavaScript",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JS icon
    },
];

const Topics = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:to-pink-300"
          onClick={() => navigate(`/learn/${topic.id}`)}
        >
          <img
            src={topic.image}
            alt={topic.title}
            className="w-20 h-20 object-contain mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {topic.title}
          </h2>
          <p className="text-gray-600 text-sm">Click to start learning</p>
        </div>
      ))}
    </div>
  );
};

export default Topics;
