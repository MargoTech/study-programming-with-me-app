import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Topics from "./pages/Topics";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import QuizHistory from "./components/QuizHistory";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/learn/:id" element={<Learn />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/history" element={<QuizHistory />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
