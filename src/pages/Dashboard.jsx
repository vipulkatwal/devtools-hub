import React, { useState, useEffect } from 'react';
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
  FileEdit,
  Layout,
  Share2,
  Search,
  Zap,
  Clock,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';

const tools = [
  {
    title: 'CSS Tools',
    description: 'Generate and customize CSS for flexbox, grid, shadows, and gradients.',
    icon: Layout,
    path: '/css-tools',
    color: 'from-teal-500/10 to-teal-600/10 hover:from-teal-500/20 hover:to-teal-600/20',
    iconColor: 'text-teal-500',
    gradient: 'from-teal-400 to-teal-600'
  },
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
  },
  {
    title: 'Meta Tags Generator',
    description: 'Generate meta tags for better SEO and social media sharing.',
    icon: Share2,
    path: '/meta-tags',
    color: 'from-indigo-500/10 to-indigo-600/10 hover:from-indigo-500/20 hover:to-indigo-600/20',
    iconColor: 'text-indigo-500',
    gradient: 'from-indigo-400 to-indigo-600'
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

const stats = [
  {
    icon: Clock,
    title: 'Time Saved',
    value: '2.5h',
    description: 'Average time saved per day',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Star,
    title: 'User Rating',
    value: '4.9/5',
    description: 'Based on 1,234 reviews',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    value: '+127%',
    description: 'Monthly active users',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Users,
    title: 'Active Users',
    value: '12.5k',
    description: 'Across 150+ countries',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState(tools);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter tools based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTools(tools);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tools.filter(
        tool =>
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Your All-in-One <span className="gradient-text">Developer Toolkit</span>
            </h1>
            <p className="text-lg text-gray-300">
              Streamline your development workflow with our comprehensive suite of tools designed for modern developers.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Get Started</span>
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Command className="w-5 h-5" />
                <span>Keyboard Shortcuts</span>
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-400">Online</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-800 rounded w-24"></div>
                  <div className="h-2 bg-gray-800 rounded w-32"></div>
                  <div className="h-2 bg-gray-800 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Search Section */}
      <section className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          />
        </div>
      </section>

      {/* Tools Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="tool-card animate-pulse">
                <div className="h-8 w-8 rounded-lg bg-gray-700 mb-4"></div>
                <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-700 rounded"></div>
              </div>
            ))
          ) : filteredTools.length > 0 ? (
            // Tool cards
            filteredTools.map((tool, index) => (
              <Link
                key={index}
                to={tool.path}
                className={`tool-card group ${tool.color}`}
              >
                <div className="tool-card-content">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${tool.iconColor} bg-opacity-10`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                    <span>Open tool</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // No results
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Why Choose DevTools Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;