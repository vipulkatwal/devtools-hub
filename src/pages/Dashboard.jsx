import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Terminal,
  Braces,
  Bookmark,
  Key,
  Palette,
  ArrowRight,
  Sparkles,
  Command,
  Keyboard,
  Type,
  GitCompare,
  Smile,
  Smartphone,
  Bot,
  FileEdit
} from 'lucide-react';

const tools = [
  {
    title: 'Code Formatter',
    description: 'Format your code with customizable rules and support for multiple languages.',
    icon: Code,
    path: '/code-formatter',
    color: 'from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with instant feedback and syntax highlighting.',
    icon: Terminal,
    path: '/regex-tester',
    color: 'from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20',
    iconColor: 'text-green-500',
    gradient: 'from-green-400 to-green-600'
  },
  {
    title: 'JSON Formatter',
    description: 'Format and validate JSON with syntax highlighting and error detection.',
    icon: Braces,
    path: '/json-formatter',
    color: 'from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20',
    iconColor: 'text-yellow-500',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  {
    title: 'UUID Generator',
    description: 'Generate and format UUIDs with support for v4 and v1 versions.',
    icon: Key,
    path: '/uuid-generator',
    color: 'from-indigo-500/10 to-indigo-600/10 hover:from-indigo-500/20 hover:to-indigo-600/20',
    iconColor: 'text-indigo-500',
    gradient: 'from-indigo-400 to-indigo-600'
  },
  {
    title: 'Color Palette',
    description: 'Generate beautiful color palettes with contrast checking and export options.',
    icon: Palette,
    path: '/color-palette',
    color: 'from-pink-500/10 to-pink-600/10 hover:from-pink-500/20 hover:to-pink-600/20',
    iconColor: 'text-pink-500',
    gradient: 'from-pink-400 to-pink-600'
  },
  {
    title: 'Snippet Manager',
    description: 'Save, organize, and manage your frequently used code snippets.',
    icon: Bookmark,
    path: '/snippets',
    color: 'from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20',
    iconColor: 'text-red-500',
    gradient: 'from-red-400 to-red-600'
  },
  {
    title: 'Lorem Ipsum Generator',
    description: 'Generate customizable dummy text for frontend testing and layouts.',
    icon: Type,
    path: '/lorem-ipsum',
    color: 'from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20',
    iconColor: 'text-emerald-500',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  {
    title: 'Diff Checker',
    description: 'Compare and highlight differences between two text blocks side by side.',
    icon: GitCompare,
    path: '/diff-checker',
    color: 'from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20',
    iconColor: 'text-cyan-500',
    gradient: 'from-cyan-400 to-cyan-600'
  },
  {
    title: 'Icon Picker',
    description: 'Browse and search through a collection of icons and emojis.',
    icon: Smile,
    path: '/icon-picker',
    color: 'from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20',
    iconColor: 'text-orange-500',
    gradient: 'from-orange-400 to-orange-600'
  },
  {
    title: 'AI Commit Generator',
    description: 'Generate commit messages from code diffs using AI models.',
    icon: Bot,
    path: '/ai-commit-generator',
    color: 'from-teal-500/10 to-teal-600/10 hover:from-teal-500/20 hover:to-teal-600/20',
    iconColor: 'text-teal-500',
    gradient: 'from-teal-400 to-teal-600'
  },
  {
    title: 'Breakpoint Tester',
    description: 'Test responsive layouts across different device sizes.',
    icon: Smartphone,
    path: '/breakpoint-tester',
    color: 'from-rose-500/10 to-rose-600/10 hover:from-rose-500/20 hover:to-rose-600/20',
    iconColor: 'text-rose-500',
    gradient: 'from-rose-400 to-rose-600'
  },
  {
    title: 'JWT Decoder',
    description: 'Decode and verify JSON Web Tokens with detailed information.',
    icon: Key,
    path: '/jwt-decoder',
    color: 'from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20',
    iconColor: 'text-amber-500',
    gradient: 'from-amber-400 to-amber-600'
  },
  {
    title: 'README Generator',
    description: 'Generate professional README files with badges and markdown preview.',
    icon: FileEdit,
    path: '/readme-generator',
    color: 'from-violet-500/10 to-violet-600/10 hover:from-violet-500/20 hover:to-violet-600/20',
    iconColor: 'text-violet-500',
    gradient: 'from-violet-400 to-violet-600'
  }
];

const features = [
  {
    icon: Command,
    title: 'Keyboard Shortcuts',
    description: 'Use keyboard shortcuts for faster navigation and improved workflow.'
  },
  {
    icon: Sparkles,
    title: 'Modern Interface',
    description: 'Clean and intuitive interface designed for maximum productivity.'
  },
  {
    icon: Keyboard,
    title: 'Quick Access',
    description: 'Save frequently used snippets and settings for quick access.'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          Welcome to DevTools Hub
        </div>
        <h1 className="text-4xl font-bold text-gray-100">
          Your Ultimate Developer Toolkit
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A collection of essential tools designed to streamline your development workflow
          and boost productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group relative"
          >
            <div className={`p-6 rounded-xl bg-gradient-to-br ${tool.color} border border-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient}`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100 mb-2">{tool.title}</h2>
              <p className="text-gray-400">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl bg-gray-800/20 border border-gray-800/50 p-8">
        <h2 className="text-2xl font-semibold text-gray-100 mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;