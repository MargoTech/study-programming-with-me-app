import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { fetchQuestionsByTopic } from "../services/api";

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
    } else {
      dispatch({ type: "SHOW_RESULT" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (showResult) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        <p className="text-lg">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
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
