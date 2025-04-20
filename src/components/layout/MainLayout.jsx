import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Smile,
  Smartphone,
  FileEdit,
  Layout,
  Share2,
  Moon,
  Sun,
  Github,
  Search,
  Bell,
  User,
  Layers,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/code-formatter', icon: Code, label: 'Code Formatter' },
    { path: '/regex-tester', icon: Terminal, label: 'Regex Tester' },
    { path: '/json-formatter', icon: Braces, label: 'JSON Formatter' },
    { path: '/uuid-generator', icon: Key, label: 'UUID Generator' },
    { path: '/color-palette', icon: Palette, label: 'Color Palette' },
    { path: '/snippets', icon: Bookmark, label: 'Snippets' },
    { path: '/lorem-ipsum', icon: Type, label: 'Lorem Ipsum' },
    { path: '/diff-checker', icon: GitCompare, label: 'Diff Checker' },
    { path: '/icon-picker', icon: Smile, label: 'Icon Picker' },
    { path: '/breakpoint-tester', icon: Smartphone, label: 'Breakpoint Tester' },
    { path: '/jwt-decoder', icon: Key, label: 'JWT Decoder' },
    { path: '/readme-generator', icon: FileEdit, label: 'README Generator' },
    { path: '/css-tools', icon: Layout, label: 'CSS Tools' },
    { path: '/meta-tags', icon: Share2, label: 'Meta Tags' },
  ];

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/features", label: "Features", icon: Layers },
    { path: "/about", label: "About", icon: Info },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const filteredNavItems = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                DevTools Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors",
                      location.pathname === link.path
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors",
                      location.pathname === link.path
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;