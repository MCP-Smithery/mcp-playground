import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Blog Post</h1>
          <p className="text-gray-600 mt-4">Post slug: {slug}</p>
          <p className="text-gray-500 mt-2">This page is under construction.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 