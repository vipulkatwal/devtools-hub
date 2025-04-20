import React from "react";
import { Github, Heart, Zap, Wrench, Code, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Open Source",
      description:
        "Built with transparency and collaboration in mind. Feel free to contribute and make it better.",
      icon: Github,
    },
    {
      title: "Developer First",
      description:
        "Created by developers who understand the needs of modern web development.",
      icon: Code,
    },
    {
      title: "Community Driven",
      description:
        "Shaped by feedback and contributions from the developer community.",
      icon: Users,
    },
    {
      title: "Modern Stack",
      description:
        "Built with React, Tailwind CSS, and other modern technologies.",
      icon: Zap,
    },
    {
      title: "Powerful Tools",
      description:
        "A comprehensive collection of tools to boost your development workflow.",
      icon: Wrench,
    },
    {
      title: "Made with Love",
      description:
        "Crafted with attention to detail and a passion for great developer experience.",
      icon: Heart,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            About DevTools Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A collection of essential tools for modern web development
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              DevTools Hub aims to provide developers with a comprehensive suite of
              tools that streamline their workflow and boost productivity. We
              believe that great tools should be accessible, easy to use, and
              constantly evolving with the needs of the development community.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
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
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/yourusername/devtools-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;