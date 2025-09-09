import { NavLink } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Topics" },
  { path: "/history", label: "History" },
];

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / App name */}
          <h1 className="text-xl font-semibold mb-2">GPT Quiz App</h1>
          {/* Navigation */}
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GPT Quiz App · Built with React + Vite
      </footer>
    </div>
  );
};

export default MainLayout;
