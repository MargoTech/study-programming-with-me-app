import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MainLayout from "./layout/MainLayout";

import Topics from "./pages/Topics";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import QuizHistory from "./pages/QuizHistory";
import NotFound from "./pages/NotFound";

const routes = [
  { path: "/", element: <Topics /> },
  { path: "/learn/:id", element: <Learn /> },
  { path: "/quiz/:id", element: <Quiz /> },
  { path: "/QuizHistory", element: <QuizHistory /> },
];

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {route.element}
              </motion.div>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
