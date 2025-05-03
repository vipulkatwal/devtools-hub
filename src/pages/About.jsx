import React from "react";
import { Github, Heart, Zap, Wrench, Code, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Developer First",
      description:
        "Crafted by developers for developers, with a deep focus on real-world needs.",
      icon: Code,
    },
    {
      title: "Modern Stack",
      description:
        "Powered by React, Tailwind CSS, and the latest web technologies for top-tier performance.",
      icon: Zap,
    },
    {
      title: "Powerful Tools",
      description:
        "A robust suite of tools to accelerate, simplify, and elevate your workflow.",
      icon: Wrench,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-white">
            About DevTools Hub
          </h1>
          <p className="text-xl text-gray-300">
            A collection of essential tools for modern web development
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              DevTools Hub empowers developers with a next-generation suite of tools designed to streamline workflows, foster innovation, and boost productivity. We are committed to delivering reliable, intuitive, and ever-evolving solutions that set new standards for the modern web development experience.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 max-w-5xl w-full mx-auto justify-items-center place-items-stretch" style={{gridAutoRows: '1fr'}}>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 flex items-start gap-4 w-full max-w-xs"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-700 via-cyan-700 to-purple-700 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;