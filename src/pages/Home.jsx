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
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 -z-10" />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400/10 dark:bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text leading-tight">
                Essential Developer Tools
                <br />
                All in One Place
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
            >
              Streamline your development workflow with our collection of powerful tools.
              <br />
              Built by developers, for developers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                to="/features"
                className="group relative px-8 py-4 rounded-lg bg-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Tools
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/10"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Popular Tools
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Discover our most used developer tools and utilities
            </motion.p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.path}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={tool.path}
                  className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient} transform group-hover:scale-110 transition-transform duration-300`}>
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
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/50 rounded-3xl -z-10" />
        <div className="max-w-5xl mx-auto py-16">
          <div className="text-center space-y-4 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              Why Choose Us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Built with the latest technologies and best practices
            </motion.p>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 transform group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;