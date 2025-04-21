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
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-400/10 dark:bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <h1 className="relative text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
              Developer Tools
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore our collection of powerful tools designed to streamline your
            development workflow
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.path}
              variants={item}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <Link
                to={tool.path}
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 block overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 -z-10" />
                <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient} transform group-hover:scale-110 transition-transform duration-300 relative`}
                  >
                    <div className="absolute inset-0 rounded-lg bg-white/20 dark:bg-black/20" />
                    <tool.icon className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;