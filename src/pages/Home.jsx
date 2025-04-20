import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Zap, Search, Wrench, Layout } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const tools = [
    {
      title: "Code Formatter",
      description: "Format your code with customizable rules and support for multiple languages.",
      icon: Code,
      path: "/code-formatter",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Color Palette",
      description: "Generate beautiful color palettes with contrast checking and export options.",
      icon: Palette,
      path: "/color-palette",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions with instant feedback and syntax highlighting.",
      icon: Search,
      path: "/regex-tester",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "CSS Tools",
      description: "Generate and customize CSS for flexbox, grid, shadows, and gradients.",
      icon: Layout,
      path: "/css-tools",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      title: "Modern Interface",
      description: "Clean and intuitive design with dark mode support and responsive layout.",
      icon: Zap,
    },
    {
      title: "Developer Focused",
      description: "Built by developers, for developers, with the tools you need most.",
      icon: Wrench,
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
            >
              Essential Developer Tools
              <br />
              All in One Place
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Streamline your development workflow with our collection of powerful tools.
              <br />
              Built by developers, for developers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              <Link
                to="/features"
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                Explore Tools
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Popular Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our most used developer tools and utilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={tool.path}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-auto" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Built with the latest technologies and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;