import React, { useState, useEffect, useRef } from 'react';
import {
  PlayIcon,
  PlusIcon,
  Cog6ToothIcon,
  ClockIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CommandLineIcon,
  ServerIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface MCPServer {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  type: 'docs' | 'research' | 'weather' | 'custom';
  description: string;
  icon: string;
}

interface PlaygroundMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: any[];
}

interface MCPConfig {
  connectionTimeout: number;
  toolExecutionTimeout: number;
  listOperationsTimeout: number;
  healthCheckTimeout: number;
  connectionRetries: number;
  toolCallRetries: number;
  listOperationRetries: number;
}

const PlaygroundPage: React.FC = () => {
  const [servers, setServers] = useState<MCPServer[]>([
    {
      id: '1',
      name: 'smithery/sdk docs',
      url: '@upstash/context7-mcp',
      status: 'connected',
      type: 'docs',
      description: 'Connect to documentation and code repositories',
      icon: '📚'
    },
    {
      id: '2', 
      name: 'Research MCP servers',
      url: 'exa',
      status: 'connected',
      type: 'research',
      description: 'Connect to exa and find recent articles and research',
      icon: '🔍'
    },
    {
      id: '3',
      name: 'Get weather forecast',
      url: '@smithery-ai/national-weather-service',
      status: 'connected',
      type: 'weather',
      description: 'Connect to weather services for forecasts',
      icon: '🌤️'
    }
  ]);

  const [messages, setMessages] = useState<PlaygroundMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'MCP Playground initialized. Connected to 3 servers. Try the starter prompts below or give the agent a custom task.',
      timestamp: new Date()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mcpConfig, setMcpConfig] = useState<MCPConfig>({
    connectionTimeout: 5000,
    toolExecutionTimeout: 60000,
    listOperationsTimeout: 10000,
    healthCheckTimeout: 5000,
    connectionRetries: 3,
    toolCallRetries: 2,
    listOperationRetries: 2
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const starterPrompts = [
    {
      title: 'Get smithery/sdk docs',
      prompt: 'Get documentation for the Smithery SDK and explain how to get started',
      server: 'docs',
      icon: '📚'
    },
    {
      title: 'Research MCP servers',
      prompt: 'Research and find the latest MCP servers and tools available',
      server: 'research', 
      icon: '🔍'
    },
    {
      title: 'Get weather forecast',
      prompt: 'Get the weather forecast for San Francisco for the next 3 days',
      server: 'weather',
      icon: '🌤️'
    }
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    
    // Add user message
    const userMessage: PlaygroundMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate processing with tool calls
    setTimeout(() => {
      const assistantMessage: PlaygroundMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Processing your request: "${message}"\n\nI've connected to the relevant MCP servers and executed the necessary tools. Here's what I found:\n\n• Connected to ${servers.filter(s => s.status === 'connected').length} active servers\n• Executed tool calls with ${mcpConfig.toolExecutionTimeout}ms timeout\n• Retrieved data successfully\n\nThis is a demo response. In a real implementation, this would connect to actual MCP servers and execute the requested operations.`,
        timestamp: new Date(),
        toolCalls: [
          { tool: 'search', server: 'exa', duration: '1.2s', status: 'success' },
          { tool: 'fetch_docs', server: 'docs', duration: '0.8s', status: 'success' }
        ]
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const addServer = () => {
    const newServer: MCPServer = {
      id: Date.now().toString(),
      name: 'Custom Server',
      url: 'custom-mcp-server',
      status: 'disconnected',
      type: 'custom',
      description: 'Custom MCP server connection',
      icon: '⚙️'
    };
    setServers(prev => [...prev, newServer]);
  };

  const getServerStatusColor = (status: MCPServer['status']) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getServerStatusIcon = (status: MCPServer['status']) => {
    switch (status) {
      case 'connected': return <CheckCircleIcon className="h-4 w-4" />;
      case 'connecting': return <ArrowPathIcon className="h-4 w-4 animate-spin" />;
      case 'error': return <ExclamationTriangleIcon className="h-4 w-4" />;
      default: return <ServerIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CommandLineIcon className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-semibold">MCP Playground</h1>
              <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
                {servers.filter(s => s.status === 'connected').length} servers
              </span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 1 && (
              <div className="text-center py-12">
                <CommandLineIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Try the starter prompts</h2>
                <p className="text-gray-400 mb-8">
                  Connect to MCP servers and start executing AI-powered tasks
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {starterPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt.prompt)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 text-left transition-colors group"
                    >
                                             <div className="flex items-center space-x-3 mb-2">
                         <span className="text-2xl">{prompt.icon}</span>
                         <span className="text-base font-semibold text-blue-400">
                           {prompt.title}
                         </span>
                       </div>
                       <p className="text-base text-gray-300 group-hover:text-white">
                         {prompt.prompt}
                       </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  'flex',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={clsx(
                    'max-w-3xl rounded-lg p-4',
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-800 text-white'
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.toolCalls && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                                           <div className="text-base text-gray-400 mb-2">Tool Calls:</div>
                       <div className="space-y-1">
                         {message.toolCalls.map((call, index) => (
                           <div key={index} className="flex items-center space-x-2 text-base">
                             <CheckCircleIcon className="h-5 w-5 text-green-400" />
                             <span>{call.tool}</span>
                             <span className="text-gray-500">({call.server})</span>
                             <span className="text-gray-500">{call.duration}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-400 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 max-w-3xl">
                  <div className="flex items-center space-x-2">
                    <ArrowPathIcon className="h-4 w-4 animate-spin text-blue-400" />
                    <span className="text-gray-300">Processing request...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Give the agent a task"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isProcessing}
                />
              </div>
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isProcessing || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
              >
                <PlayIcon className="h-4 w-4" />
                <span>Send</span>
              </button>
            </div>

            {/* Add Servers */}
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={addServer}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                <ServerIcon className="h-4 w-4" />
                <CloudIcon className="h-4 w-4" />
                <span className="text-sm">Add servers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        {showSettings && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Connection Timeouts */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-semibold">Connection Timeouts</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  How long to wait before timing out different MCP operations
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Server connection timeout
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.connectionTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          connectionTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-20"
                      />
                      <span className="text-gray-400 text-sm">ms</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Individual tool execution timeout
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.toolExecutionTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          toolExecutionTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-20"
                      />
                      <span className="text-gray-400 text-sm">ms</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Fetching tools, prompts, resources
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.listOperationsTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          listOperationsTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-20"
                      />
                      <span className="text-gray-400 text-sm">ms</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Health check timeout
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.healthCheckTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          healthCheckTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-20"
                      />
                      <span className="text-gray-400 text-sm">ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retry Attempts */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-semibold">Retry Attempts</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  How many times to retry failed operations before giving up
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Connection retries
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.connectionRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          connectionRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-16"
                      />
                      <span className="text-gray-400 text-sm">tries</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Tool execution retries
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.toolCallRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          toolCallRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-16"
                      />
                      <span className="text-gray-400 text-sm">tries</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      List operation retries
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mcpConfig.listOperationRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          listOperationRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 w-16"
                      />
                      <span className="text-gray-400 text-sm">tries</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Servers */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connected Servers</h3>
                <div className="space-y-3">
                  {servers.map(server => (
                    <div key={server.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{server.icon}</span>
                          <span className="text-sm font-medium">{server.name}</span>
                        </div>
                        <div className={clsx('flex items-center space-x-1', getServerStatusColor(server.status))}>
                          {getServerStatusIcon(server.status)}
                          <span className="text-xs capitalize">{server.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{server.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundPage; 