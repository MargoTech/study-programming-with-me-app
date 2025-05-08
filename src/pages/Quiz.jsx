import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { fetchQuestionsByTopic } from "../services/api";
import { motion } from "framer-motion";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_SELECTED_OPTION":
      return { ...state, selectedOption: action.payload };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "INCREMENT_INDEX":
      return { ...state, currentIndex: state.currentIndex + 1 };
    case "SHOW_RESULT":
      return { ...state, showResult: true };
    case "RESET_QUIZ":
      return {
        ...initialState,
        questions: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  questions: [],
  loading: true,
  currentIndex: 0,
  selectedOption: null,
  showResult: false,
  score: 0,
  error: null,
};

const Quiz = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const {
    questions,
    loading,
    currentIndex,
    selectedOption,
    showResult,
    score,
    error,
  } = state;

  const [timeLeft, setTimeLeft] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const data = await fetchQuestionsByTopic(id);
        dispatch({ type: "SET_QUESTIONS", payload: data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    loadQuestions();
  }, [id]);

  useEffect(() => {
    if (showResult) {
      const MAX_HISTORY = 20;

      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

      const newResult = {
        topic: id,
        score,
        total: questions.length,
        date: new Date().toISOString(),
      };

      const newHistory = [...history.slice(-MAX_HISTORY + 1), newResult];

      localStorage.setItem("quizHistory", JSON.stringify(newHistory));
    }
  }, [showResult, id, score, questions.length]);

  useEffect(() => {
    if (selectedOption !== null || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, selectedOption, showResult]);

  const restartQuiz = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchQuestionsByTopic(id);
      dispatch({ type: "RESET_QUIZ", payload: data });
      setTimeLeft(15);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  const handleOptionClick = (index) => {
    dispatch({ type: "SET_SELECTED_OPTION", payload: index });
    if (index === state.questions[currentIndex].answer) {
      dispatch({ type: "INCREMENT_SCORE" });
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      dispatch({ type: "INCREMENT_INDEX" });
      dispatch({ type: "SET_SELECTED_OPTION", payload: null });
      setTimeLeft(15);
    } else {
      dispatch({ type: "SHOW_RESULT" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (showResult) {
    return (
      <motion.div
        className="p-6 max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        <p className="text-lg">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
        <div>
          <button
            onClick={() => navigate("/history")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📜 View History
          </button>
          <button
            onClick={restartQuiz}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            🔁 Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <p className="mb-2 text-sm text-gray-600 text-right">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <div className="mb-4 w-full bg-gray-200 h-2 rounded overflow-hidden">
        <motion.div
          className="bg-blue-500 h-full"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-lg font-medium">{current.question}</h2>
        <span className="text-sm text-red-600 font-bold">⏳ {timeLeft}s</span>
      </motion.div>
      <h1 className="text-2xl font-bold mb-4 ">
        Topic's test {id.toUpperCase()}
      </h1>
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
