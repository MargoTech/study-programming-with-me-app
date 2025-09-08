import { path } from "express/lib/application";
import { label, link } from "framer-motion/client";
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
          <h1 className="text-xl font-semibold md-2">
            GPT Quiz App GPT Quiz App
          </h1>
          {/* Navigation */}
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink to="/" className="text-blue-600 hover:underline">
                {link.label}
              </NavLink>
            ))}
          </nav>
          Main content
        </div>
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
