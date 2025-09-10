import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        ⬅ Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
