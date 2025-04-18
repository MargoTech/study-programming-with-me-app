import { useParams, useNavigate } from "react-router-dom";

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Topic: {id.toUpperCase()}</h1>
      <p className="mb-6">"Here will be some theory about {id}"</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate(`/quiz/${id}`)}
      >
        Test
      </button>
    </div>
  );
};

export default Learn;
