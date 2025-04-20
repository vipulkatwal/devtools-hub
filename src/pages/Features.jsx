import React from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Search,
  Braces,
  Layout,
  Palette,
  FileCode,
  Smartphone,
  Key,
  ArrowRight,
} from "lucide-react";

const Features = () => {
  const tools = [
    {
      title: "Code Formatter",
      description:
        "Format your code with customizable rules and support for multiple languages including JavaScript, HTML, CSS, and more.",
      icon: Code,
      path: "/code-formatter",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Regex Tester",
      description:
        "Test and debug regular expressions with instant feedback, syntax highlighting, and match visualization.",
      icon: Search,
      path: "/regex-tester",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "JSON Formatter",
      description:
        "Format and validate JSON with syntax highlighting, error detection, and collapsible tree view.",
      icon: Braces,
      path: "/json-formatter",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "CSS Tools",
      description:
        "Generate and customize CSS for flexbox, grid layouts, shadows, gradients, and animations.",
      icon: Layout,
      path: "/css-tools",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Color Palette",
      description:
        "Generate beautiful color palettes with contrast checking, accessibility validation, and export options.",
      icon: Palette,
      path: "/color-palette",
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Meta Tags",
      description:
        "Generate and preview meta tags for social media sharing with live preview and validation.",
      icon: FileCode,
      path: "/meta-tags",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Breakpoint Tester",
      description:
        "Test responsive layouts with different screen sizes and device presets.",
      icon: Smartphone,
      path: "/breakpoint-tester",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "JWT Decoder",
      description:
        "Decode and verify JSON Web Tokens with detailed payload information and validation.",
      icon: Key,
      path: "/jwt-decoder",
      gradient: "from-teal-500 to-green-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Developer Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our collection of powerful tools designed to streamline your
            development workflow
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient}`}
                >
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;