import React from "react";
import { Github, Wrench, Zap, Heart } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      title: "Powerful Tools",
      description:
        "Access a comprehensive suite of development tools designed to streamline your workflow.",
      icon: Wrench,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Lightning Fast",
      description:
        "Experience instant results with our optimized tools and responsive interface.",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Open Source",
      description:
        "Built with love by developers for developers. Free and open source forever.",
      icon: Heart,
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <div className="max-w-4xl mx-auto">
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
              About DevTools Hub
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Your one-stop destination for essential developer tools and utilities
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose dark:prose-invert max-w-none mb-16"
        >
          <div className="relative p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 -z-10" />
            <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              DevTools Hub is built with the vision of providing developers with a
              comprehensive suite of tools that enhance productivity and streamline
              workflows. We believe in the power of well-crafted tools to transform
              the development experience, making it more efficient and enjoyable.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="relative group"
            >
              <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 -z-10" />
                <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} transform group-hover:scale-110 transition-transform duration-300 relative inline-flex mb-4`}
                >
                  <div className="absolute inset-0 rounded-lg bg-white/20 dark:bg-black/20" />
                  <feature.icon className="w-6 h-6 text-white relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-xl transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://github.com/yourusername/devtools-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;