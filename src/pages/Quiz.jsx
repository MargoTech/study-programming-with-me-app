import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQUestions = async () => {
      try {
        console.log(`Download quiestions about ${id}`);

        const mockQuestions = [
          { question: "What is HTML?", options: [], answer: 0 },
        ];

        setQuestions(mockQuestions);
      } catch (error) {
        console.error("Download mistake", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQUestions();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Topic's test {id}</h1>

      {loading ? (
        <p>Download...</p>
      ) : (
        <pre>{JSON.stringify(questions, null, 2)}</pre>
      )}
    </div>
  );
};

export default Quiz;
