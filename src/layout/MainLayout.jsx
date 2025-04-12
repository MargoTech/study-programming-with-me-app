import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      Header
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold md-2">GPT Quiz App</h1>
        <nav>
          <Link to="/" className="text-blue-600 hover:underline">
            Topics
          </Link>
        </nav>
        Main content
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
