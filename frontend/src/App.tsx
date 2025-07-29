import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ToolsPage from '@/pages/ToolsPage';
import ToolDetailPage from '@/pages/ToolDetailPage';
import DocumentationPage from '@/pages/DocumentationPage';
import PlaygroundPage from '@/pages/PlaygroundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:id" element={<ToolDetailPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 