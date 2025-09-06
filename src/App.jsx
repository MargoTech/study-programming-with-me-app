import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "./layout/MainLayout";
import Topics from "./pages/Topics";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const routes = [
  { path: "/", element: <Topics /> },
  { path: "/learn/:id", element: <Learn /> },
  { path: "/quiz/:id", element: <Quiz /> },
  { path: "/history", element: <History /> },
];

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
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
