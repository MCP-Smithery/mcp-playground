import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  TagIcon, 
  StarIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline';
import { toolsApi } from '@/services/api';
import { Tool } from '@/types';

const ToolsPage: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const categories = ['Development', 'AI', 'Documentation', 'Productivity', 'Data', 'Integration'];

  useEffect(() => {
    fetchTools();
  }, [searchQuery, selectedCategory, selectedTag]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchQuery) params.q = searchQuery;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTag) params.tags = [selectedTag];

      const response = await toolsApi.getAll(params);
      if (response.success && response.data) {
        setTools(response.data);
      } else {
        setError(response.error || 'Failed to fetch tools');
      }
    } catch (err) {
      setError('Failed to fetch tools');
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTools();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`h-4 w-4 ${
            i < fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-base text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Tools Marketplace
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and integrate powerful AI tools into your workflows. 
            From code analysis to content generation, find the perfect tool for your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="input-field pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                placeholder="Filter by tag..."
                className="input-field"
              />
              
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchTools}
              className="btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No tools found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                                     <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">
                       {tool.name}
                     </h3>
                     <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                       {tool.category}
                     </span>
                   </div>
                   <span className="text-base text-gray-500 font-medium">v{tool.version}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3 text-base leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <TagIcon className="h-4 w-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {tool.tags.length > 3 && (
                    <span className="text-sm text-gray-500 font-medium">
                      +{tool.tags.length - 3} more
                    </span>
                  )}
                </div>

                                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4 text-base text-gray-600">
                    <div className="flex items-center">
                      <ArrowDownIcon className="h-5 w-5 mr-2" />
                      {formatNumber(tool.downloads)}
                    </div>
                    {renderStars(tool.rating)}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600 font-medium">
                    by {tool.author}
                  </span>
                  <Link
                    to={`/tools/${tool.id}`}
                    className="btn-primary text-base px-6 py-3"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {tools.length > 0 && tools.length % 9 === 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage; 