import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Palette,
  ChevronRight,
  Type,
  GitCompare,
  Smile
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
    { path: '/lorem-ipsum', icon: Type, label: 'Lorem Ipsum' },
    { path: '/diff-checker', icon: GitCompare, label: 'Diff Checker' },
    { path: '/icon-picker', icon: Smile, label: 'Icon Picker' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <nav
        className={cn(
          "fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="relative h-full bg-[#111827]/80 backdrop-blur-xl border-r border-gray-800/50">
          <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
            {isSidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                  DevTools Hub
                </h1>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="p-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                        isActive
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5 transition-transform group-hover:scale-110",
                        isActive && "text-blue-400"
                      )} />
                      {isSidebarOpen && (
                        <>
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 text-blue-400 absolute right-3" />
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
            <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded-lg transition-colors",
                "group"
              )}
            >
              <Settings className="w-5 h-5 transition-transform group-hover:rotate-90" />
              {isSidebarOpen && (
                <span className="font-medium">Settings</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out pt-5",
          isSidebarOpen ? "pl-64" : "pl-20"
        )}
      >
        <div className="container mx-auto p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;