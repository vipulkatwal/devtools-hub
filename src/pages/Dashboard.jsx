import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code,
  FileText,
  Terminal,
  Braces,
  Bookmark,
  Key,
  Palette,
  ArrowRight
} from 'lucide-react';

const tools = [
  {
    title: 'Code Formatter',
    description: 'Format your code with customizable rules and support for multiple languages.',
    icon: Code,
    path: '/code-formatter',
    color: 'from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Markdown Preview',
    description: 'Preview your Markdown content in real-time with support for images and tables.',
    icon: FileText,
    path: '/markdown-preview',
    color: 'from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30',
    iconColor: 'text-purple-500'
  },
  {
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with instant feedback and syntax highlighting.',
    icon: Terminal,
    path: '/regex-tester',
    color: 'from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30',
    iconColor: 'text-green-500'
  },
  {
    title: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting and error detection.',
    icon: Braces,
    path: '/json-formatter',
    color: 'from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30',
    iconColor: 'text-yellow-500'
  },
  {
    title: 'UUID Generator',
    description: 'Generate and format UUIDs with support for v4 and v1 versions.',
    icon: Key,
    path: '/uuid-generator',
    color: 'from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500/30 hover:to-indigo-600/30',
    iconColor: 'text-indigo-500'
  },
  {
    title: 'Color Palette',
    description: 'Generate beautiful color palettes with contrast checking and export options.',
    icon: Palette,
    path: '/color-palette',
    color: 'from-pink-500/20 to-pink-600/20 hover:from-pink-500/30 hover:to-pink-600/30',
    iconColor: 'text-pink-500'
  },
  {
    title: 'Snippet Manager',
    description: 'Save, organize, and manage your frequently used code snippets.',
    icon: Bookmark,
    path: '/snippets',
    color: 'from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30',
    iconColor: 'text-red-500'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Welcome to DevTools Hub
        </h1>
        <p className="text-xl text-gray-400">
          Your all-in-one development toolkit for increased productivity
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={tool.path}>
              <div className={`p-6 rounded-xl bg-gradient-to-br ${tool.color} backdrop-blur-lg border border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
                <div className="flex items-start justify-between">
                  <tool.icon className={`w-8 h-8 ${tool.iconColor}`} />
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{tool.title}</h2>
                <p className="mt-2 text-gray-400">{tool.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-lg border border-gray-700/50"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Tips</h2>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Use keyboard shortcuts for faster navigation
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Save frequently used snippets for quick access
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Customize your workspace in the settings
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;