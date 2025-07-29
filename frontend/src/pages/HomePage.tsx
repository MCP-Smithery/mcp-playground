import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  SparklesIcon, 
  ArrowRightIcon,
  CheckIcon,
  RocketLaunchIcon,
  CogIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      name: 'AI-Powered Tools',
      description: 'Access a vast library of AI tools for every use case, from code analysis to content generation.',
      icon: SparklesIcon,
    },
    {
      name: 'MCP Integration',
      description: 'Seamlessly integrate with Model Context Protocol for enhanced AI capabilities.',
      icon: CogIcon,
    },
    {
      name: 'Developer-Friendly',
      description: 'Built by developers, for developers. Simple APIs and clear documentation.',
      icon: CodeBracketIcon,
    },
    {
      name: 'High Performance',
      description: 'Optimized for speed and efficiency with enterprise-grade reliability.',
      icon: CpuChipIcon,
    },
    {
      name: 'Community Driven',
      description: 'Join thousands of developers building the future of AI tools.',
      icon: UsersIcon,
    },
    {
      name: 'Easy Deployment',
      description: 'Deploy your tools instantly with our streamlined deployment process.',
      icon: RocketLaunchIcon,
    },
  ];

  const benefits = [
    'Access to 100+ AI tools',
    'Real-time API access',
    'Community support',
    'Comprehensive documentation',
    'Free tier available',
    'Enterprise support'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Build the Future with{' '}
              <span className="text-primary-600">AI Tools</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              Smithery.ai is your comprehensive platform for building, sharing, and deploying AI tools. 
              Access powerful MCP tools and enhance your workflows with intelligent automation.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/tools"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Explore Tools
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/documentation"
                className="btn-secondary text-lg px-8 py-3"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything you need to build amazing AI tools
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From ideation to deployment, we provide all the tools and infrastructure you need.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="card text-center">
                <div className="flex justify-center">
                  <feature.icon className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Why choose Smithery.ai?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Join thousands of developers who are already building the next generation of AI-powered applications.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/tools"
                  className="btn-primary inline-flex items-center"
                >
                  Start Building
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="bg-primary-50 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">100+</div>
                  <div className="text-sm text-gray-600 mt-1">AI Tools Available</div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">10k+</div>
                    <div className="text-sm text-gray-600">Active Developers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join the AI revolution and start building amazing tools today.
            </p>
            <div className="mt-8">
              <Link
                to="/tools"
                className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 