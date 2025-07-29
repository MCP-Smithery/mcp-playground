import React from 'react';
import { useParams } from 'react-router-dom';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Tool Details</h1>
          <p className="text-gray-300 mt-4">Tool ID: {id}</p>
          <p className="text-gray-400 mt-2">This page is under construction.</p>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage; 