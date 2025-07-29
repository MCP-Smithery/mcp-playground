import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
  EyeIcon,
  CloudIcon,
  ComputerDesktopIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

interface ToolCategory {
  name: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface FeaturedTool {
  id: string;
  name: string;
  username: string;
  description: string;
  icon: string;
  verified: boolean;
  type: 'Remote' | 'Local';
  stats: string;
  category: string;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredTools: FeaturedTool[] = [
    {
      id: '1',
      name: 'Browserbase',
      username: '@browserbase/mcp-browserbase',
      description: 'Provide cloud browser automation capabilities using Stagehand.',
      icon: '🌐',
      verified: true,
      type: 'Remote',
      stats: '9.07k',
      category: 'Browser Automation'
    },
    {
      id: '2',
      name: 'Ref',
      username: '@ref-tools/ref-tools-mcp',
      description: 'Provide your AI coding tools with token-efficient access to up-to-date technical documentation.',
      icon: '📚',
      verified: true,
      type: 'Remote',
      stats: '698',
      category: 'Documentation'
    },
    {
      id: '3',
      name: 'National Parks Information Serv...',
      username: '@geobio/mcp-server-nationalparks',
      description: 'Provide real-time, detailed information about U.S. National Parks including park details.',
      icon: '🏞️',
      verified: true,
      type: 'Remote',
      stats: '5.42k',
      category: 'Information'
    },
    {
      id: '4',
      name: 'Supadata: Web & Video data ...',
      username: '@supadata-ai/mcp',
      description: 'Turn YouTube, TikTok, X videos and websites into structured data. Skip the hassle of vid.',
      icon: '📊',
      verified: true,
      type: 'Remote',
      stats: '1.2k',
      category: 'Data Processing'
    }
  ];

  const popularTools: FeaturedTool[] = [
    {
      id: '5',
      name: 'Exa Search',
      username: 'exa',
      description: 'Fast, intelligent web search and crawling. Exa combines embeddings and traditional search.',
      icon: '🔍',
      verified: true,
      type: 'Remote',
      stats: '116.12k',
      category: 'Web Search'
    },
    {
      id: '6',
      name: 'Desktop Commander',
      username: '@wonderwhy-er/desktop-commander',
      description: '**Execute terminal commands** and manage files with diff editing capabilities. Coding, she...',
      icon: '💻',
      verified: true,
      type: 'Local',
      stats: '1.06m',
      category: 'System Tools'
    },
    {
      id: '7',
      name: 'Context7',
      username: '@upstash/context7-mcp',
      description: 'Fetch up-to-date, version-specific documentation and code examples directly.',
      icon: '📋',
      verified: true,
      type: 'Remote',
      stats: '61.59k',
      category: 'Documentation'
    },
    {
      id: '8',
      name: 'Redis',
      username: '@redis/mcp-redis',
      description: 'Enable AI agents to manage and search data in Redis using natural language queries.',
      icon: '🔴',
      verified: true,
      type: 'Remote',
      stats: '1.8k',
      category: 'Database'
    }
  ];

  const categories: ToolCategory[] = [
    { name: 'Web Search', count: 146, icon: MagnifyingGlassIcon, color: 'bg-blue-500' },
    { name: 'Browser Automation', count: 121, icon: ComputerDesktopIcon, color: 'bg-green-500' },
    { name: 'Memory Management', count: 7, icon: CloudIcon, color: 'bg-purple-500' },
    { name: 'AI Workflow Integrations', count: 449, icon: StarIcon, color: 'bg-yellow-500' },
    { name: 'LLM Integration Frameworks', count: 803, icon: EyeIcon, color: 'bg-red-500' },
    { name: 'Web Search & Extraction', count: 309, icon: MagnifyingGlassIcon, color: 'bg-indigo-500' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(popularTools.length / 4));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to tools page with search query
    window.location.href = `/tools?q=${encodeURIComponent(searchQuery)}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(popularTools.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(popularTools.length / 4)) % Math.ceil(popularTools.length / 4));
  };

  const ToolCard: React.FC<{ tool: FeaturedTool }> = ({ tool }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-lg">
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-white font-medium text-sm">{tool.name}</h3>
              {tool.verified && <CheckBadgeIcon className="w-4 h-4 text-blue-400" />}
            </div>
            <p className="text-gray-400 text-xs">{tool.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs ${
            tool.type === 'Remote' 
              ? 'bg-blue-900 text-blue-300 border border-blue-700' 
              : 'bg-orange-900 text-orange-300 border border-orange-700'
          }`}>
            {tool.type === 'Remote' ? '🌐 Remote' : '💻 Local'}
          </span>
          <span className="text-gray-400 text-xs">⬆ {tool.stats}</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
        {tool.description}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Agent's Gateway to the World
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Integrate your AI with <span className="text-white font-semibold">5569</span> skills and extensions built by the community.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="send messages and receive notifications"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
              </div>
            </form>

            {/* Network Visualization Background */}
            <div className="relative">
              <svg className="w-full h-64 opacity-20" viewBox="0 0 800 200">
                <defs>
                  <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </radialGradient>
                </defs>
                {/* Network lines */}
                <line x1="100" y1="100" x2="300" y2="60" stroke="#374151" strokeWidth="1" />
                <line x1="100" y1="100" x2="300" y2="140" stroke="#374151" strokeWidth="1" />
                <line x1="300" y1="60" x2="500" y2="80" stroke="#374151" strokeWidth="1" />
                <line x1="300" y1="140" x2="500" y2="120" stroke="#374151" strokeWidth="1" />
                <line x1="500" y1="80" x2="700" y2="100" stroke="#374151" strokeWidth="1" />
                <line x1="500" y1="120" x2="700" y2="100" stroke="#374151" strokeWidth="1" />
                
                {/* Network nodes */}
                <circle cx="400" cy="100" r="4" fill="url(#nodeGradient)" />
                <circle cx="200" cy="80" r="3" fill="#EF4444" />
                <circle cx="600" cy="120" r="3" fill="#10B981" />
                <circle cx="500" cy="60" r="2" fill="#F59E0B" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Featured</h2>
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              {featuredTools.length}
            </span>
          </div>
          <Link 
            to="/tools?featured=true" 
            className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm"
          >
            <span>View all</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Popular</h2>
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              2667
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/tools?sort=popular" 
              className="text-gray-400 hover:text-white flex items-center space-x-1 text-sm"
            >
              <span>View all</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.slice(currentSlide * 4, (currentSlide + 1) * 4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/tools?category=${encodeURIComponent(category.name)}`}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{category.count} tools</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ready to enhance your AI?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers building the next generation of AI applications with MCP tools.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/playground"
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Try Playground
              </Link>
              <Link
                to="/tools"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Browse Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 