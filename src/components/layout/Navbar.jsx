import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Settings from '../settings/Settings';

const Navbar = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/formatter', label: 'Code Formatter' },
    { path: '/markdown', label: 'Markdown Preview' },
    { path: '/regex', label: 'Regex Tester' },
    { path: '/json', label: 'JSON Formatter' },
    { path: '/snippets', label: 'Snippets' },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
                DevTools Hub
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <Settings />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;