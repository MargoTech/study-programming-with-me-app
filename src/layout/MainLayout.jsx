import { NavLink } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Topics" },
  { path: "/history", label: "History" },
];

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / App name */}
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
            GPT Quiz App
          </h1>

          {/* Navigation */}
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
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
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GPT Quiz App · Built with React + Vite
      </footer>
    </div>
  );
};

export default MainLayout;
