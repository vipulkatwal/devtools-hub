import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const tools = [
    {
      title: "Code Formatter",
      description: "Format your code with customizable rules and support for multiple languages.",
      path: "/code-formatter",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Color Palette",
      description: "Generate beautiful color palettes with contrast checking and export options.",
      path: "/color-palette",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Color Palette Gallery",
      description: "Browse and search beautiful color palettes, inspired by Dribbble/Color Hunt UI.",
      path: "/color-palettes",
      gradient: "from-yellow-400 to-pink-400",
    },
    {
      title: "Regex Tester",
      description: "Test and debug regular expressions with instant feedback and syntax highlighting.",
      path: "/regex-tester",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "CSS Tools",
      description: "Generate and customize CSS for flexbox, grid, shadows, and gradients.",
      path: "/css-tools",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      title: "Modern Interface",
      description: "Clean and intuitive design with dark mode support and responsive layout.",
    },
    {
      title: "Developer Focused",
      description: "Built by developers, for developers, with the tools you need most.",
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-4 pb-4 min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950 via-gray-900 to-cyan-900 opacity-90" />
        <div className="w-full flex justify-center">
          <div className="max-w-3xl w-full text-center px-4 sm:px-8">
            <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl shadow-xl px-8 py-6 mx-auto">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                Essential Developer Tools
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  All in One Place
                </span>
              </h1>
              <p className="text-lg text-gray-200 font-medium mb-8">
                Streamline your workflow with our <span className="text-cyan-300 font-semibold">powerful developer tools</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/features"
                  className="px-7 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-base shadow-md transition-all flex items-center gap-2"
                >
                  <span className="inline-block"><ArrowRight className="w-5 h-5" /></span>
                  Explore Tools
                </Link>
                <Link
                  to="/about"
                  className="px-7 py-3 rounded-lg bg-gray-900/80 hover:bg-gray-800 text-gray-100 font-semibold text-base shadow-md border border-white/10 transition-all flex items-center gap-2"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-white">
              Popular Tools
            </h2>
            <p className="text-gray-300">
              Discover our most used developer tools and utilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.path}
              >
                <Link
                  to={tool.path}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                      {/* Icon placeholder */}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-white">
              Why Choose Us?
            </h2>
            <p className="text-gray-300">
              Built with the latest technologies and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    {/* Icon placeholder */}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;