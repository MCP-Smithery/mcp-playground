import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: 'Docs', href: '/documentation' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                🔥 Smithery.ai
              </Link>
            </div>
            
            {/* Center: Navigation Menu - Absolutely centered */}
            <div className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    isActive(item.href) ? 'nav-link-active' : 'nav-link'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Right: Action Buttons */}
            <div className="hidden sm:flex sm:items-center space-x-3 ml-auto">
              <Link
                to="/playground"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-base py-2 px-5 rounded-lg transition-colors"
              >
                Try Playground
              </Link>
              <button className="btn-primary text-base font-semibold py-2 px-5">
                Get Started
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-gray-900">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'block px-3 py-2 text-lg font-semibold',
                    isActive(item.href)
                      ? 'text-white bg-primary-600'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="px-3 space-y-2">
                <Link
                  to="/playground"
                  className="block w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors text-center"
                >
                  Try Playground
                </Link>
                <button className="w-full btn-primary">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {      /* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">🔥 Smithery.ai</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-md">
                The orchestration layer for AI agents. Build, share, and deploy AI tools with ease.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/documentation" className="text-base text-gray-400 hover:text-white">
                    Docs
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    System Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Mission
                  </a>
                </li>

                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Smithery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 