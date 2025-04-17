import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code,
  FileText,
  Home,
  Settings,
  Terminal,
  Braces,
  Bookmark,
  Menu,
  X,
  Key,
  Palette
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/code-formatter', icon: Code, label: 'Code Formatter' },
    { path: '/markdown-preview', icon: FileText, label: 'Markdown Preview' },
    { path: '/regex-tester', icon: Terminal, label: 'Regex Tester' },
    { path: '/json-formatter', icon: Braces, label: 'JSON Formatter' },
    { path: '/uuid-generator', icon: Key, label: 'UUID Generator' },
    { path: '/color-palette', icon: Palette, label: 'Color Palette' },
    { path: '/snippets', icon: Bookmark, label: 'Snippets' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.nav
        initial={false}
        animate={{ width: isSidebarOpen ? '240px' : '60px' }}
        className="fixed top-0 left-0 h-full bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 z-50"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            {isSidebarOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-white"
              >
                DevTools Hub
              </motion.h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>

          <div className="flex-1 py-8">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.li
                    key={item.path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-blue-600/20 text-blue-400"
                          : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-100"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {isSidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="p-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-gray-100 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  Settings
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main
        className={cn(
          "min-h-screen transition-all duration-200",
          isSidebarOpen ? "ml-60" : "ml-16"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="container mx-auto p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default MainLayout;