import { useNavigate } from "react-router-dom";

const topics = [
  { id: "html", title: "HTML for beginners" },
  { id: "css", title: "Basic CSS" },
  { id: "js", title: "Basic JavaScript" },
];

const Topics = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-3">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/learn/${topic.id}`)}
        >
          <h2 className="text-xl font-semibold">{topic.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Topics;
