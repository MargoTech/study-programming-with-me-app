import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchQuestionsByTopic } from "../services/api";

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestionsByTopic(id);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [id]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === questions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (showResult) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Test completed!</h1>
        <p className="text-lg mb-2">
          Your score: {score} out of {questions.length}
        </p>
        <p className="text-sm text-gray-500">Topic: {id.toUpperCase()}</p>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 ">
        Topic's test {id.toUpperCase()}
      </h1>
      <h2 className="text-lg font-medium mb-4">{current.question}</h2>
      <div className="grid gap-3">
        {current.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`px-4 py-2 rounded border text-left transition ${
              selectedOption === index
                ? index === current.answer
                  ? "bg-green-300 border-green-500"
                  : "bg-red-300 border-red-500"
                : "hover:bg-blue-100 border-gray-300"
            }`}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedOption !== null && (
        <button
          onClick={handleNext}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {currentIndex + 1 < questions.length ? "Next" : "Show Result"}
        </button>
      )}
    </div>
  );
};

export default Quiz;
