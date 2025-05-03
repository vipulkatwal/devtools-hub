import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }) => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/about", label: "About" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg shadow-lg">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                DevTools Hub
              </span>
            </Link>
            {/* Centered pill navbar */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center bg-gray-800 rounded-full shadow-lg px-2 py-1 space-x-2 md:space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-6 py-2 rounded-full font-semibold transition-colors text-base",
                      location.pathname === link.path
                        ? "bg-white text-gray-900 dark:bg-white dark:text-gray-900 shadow"
                        : "text-gray-200 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* No theme toggle, just a placeholder for spacing */}
            <div className="w-10 h-10" />
          </div>
        </nav>
      </header>
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;