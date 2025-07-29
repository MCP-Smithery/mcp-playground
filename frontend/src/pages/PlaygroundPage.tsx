import React, { useState, useEffect, useRef } from 'react';
import {
  PlayIcon,
  PlusIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';



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

  const [messages, setMessages] = useState<PlaygroundMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'MCP Playground initialized. Connected to 3 servers. Try the starter prompts below or give the agent a task.',
      timestamp: new Date()
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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
      prompt: 'Connect to @upstash/context7-mcp',
      icon: '📚'
    },
    {
      title: 'Research MCP servers',
      prompt: 'Connect to exa and find recent articles and research',
      icon: '🔍'
    },
    {
      title: 'Get weather forecast',
      prompt: 'Connect to @smithery-ai/national-weather-service',
      icon: '🌤️'
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim() || isProcessing) return;

    const userMessage: PlaygroundMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      const assistantMessage: PlaygroundMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant', 
        content: `I've processed your request: "${message}". Here are the results from the connected MCP servers.`,
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
    // Add server functionality would be implemented here
    console.log('Add server clicked');
  };

  return (
    <div className="bg-gray-900 text-white" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="flex h-full">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 1 && (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2 text-gray-300">Try the starter prompts</h2>
                <p className="text-gray-500 mb-12">
                  Connect to MCP servers and start executing AI-powered tasks
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {starterPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt.prompt)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-6 text-left transition-colors group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{prompt.icon}</span>
                        <span className="text-base font-semibold text-blue-400">
                          {prompt.title}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {prompt.prompt}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-gray-500 text-sm">
                    or enter <kbd className="bg-gray-800 px-2 py-1 rounded text-xs">⌘K</kbd> to view command menu
                  </p>
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
                      <div className="text-sm text-gray-400 mb-2">Tool Calls:</div>
                      <div className="space-y-1">
                        {message.toolCalls.map((call, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircleIcon className="h-4 w-4 text-green-400" />
                            <span>{call.tool}</span>
                            <span className="text-gray-500">({call.server})</span>
                            <span className="text-gray-500">{call.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
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
          <div className="border-t border-gray-700 bg-gray-800/50 p-4">
            <div className="flex space-x-3 mb-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputMessage);
                    }
                  }}
                  placeholder="Give the agent a task"
                  className="w-full bg-gray-700/80 text-white border border-gray-600/50 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 min-h-[60px] placeholder-gray-400"
                  disabled={isProcessing}
                  rows={1}
                />
              </div>
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isProcessing || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 self-end shadow-lg hover:shadow-xl"
              >
                <PlayIcon className="h-4 w-4" />
                <span className="font-medium">Send</span>
              </button>
            </div>

            {/* Model Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <select className="bg-gray-700 text-white border border-gray-600/50 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50">
                  <option>gpt-4.1</option>
                  <option>gpt-4</option>
                  <option>claude-3</option>
                </select>
                <span className="text-gray-400 text-sm bg-gray-700/50 px-2 py-1 rounded">auto</span>
                <span className="text-gray-400 text-sm bg-gray-700/50 px-2 py-1 rounded">yolo</span>
              </div>
              
              <button
                onClick={addServer}
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add servers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Sidebar - Always Visible */}
        <div className="w-80 bg-gray-800/80 border-l border-gray-700/50 p-5 overflow-y-auto">
          <div className="space-y-6">
            {/* Connection Timeouts */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-200">Connection Timeouts</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                How long to wait before timing out different MCP operations
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Connection
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="number"
                        value={mcpConfig.connectionTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          connectionTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-16 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">ms</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Server connection timeout</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Tool Calls
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="number"
                        value={mcpConfig.toolExecutionTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          toolExecutionTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-16 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">ms</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Individual tool execution timeout</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      List Operations
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="number"
                        value={mcpConfig.listOperationsTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          listOperationsTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-16 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">ms</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Fetching tools, prompts, resources</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Ping
                    </label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="number"
                        value={mcpConfig.healthCheckTimeout}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          healthCheckTimeout: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-16 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">ms</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Health check timeout</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Retry Attempts */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <ArrowPathIcon className="h-4 w-4 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-200">Retry Attempts</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                How many times to retry failed operations before giving up
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Connection
                    </label>
                    <div className="flex flex-col items-center space-y-1">
                      <input
                        type="number"
                        value={mcpConfig.connectionRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          connectionRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-12 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">tries</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Connection retries</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Tool Calls
                    </label>
                    <div className="flex flex-col items-center space-y-1">
                      <input
                        type="number"
                        value={mcpConfig.toolCallRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          toolCallRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-12 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">tries</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Tool execution retries</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      List Operations
                    </label>
                    <div className="flex flex-col items-center space-y-1">
                      <input
                        type="number"
                        value={mcpConfig.listOperationRetries}
                        onChange={(e) => setMcpConfig(prev => ({
                          ...prev,
                          listOperationRetries: parseInt(e.target.value)
                        }))}
                        className="bg-gray-700/80 text-white border border-gray-600/50 rounded px-2 py-1.5 w-12 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                      <span className="text-gray-400 text-xs">tries</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">List operation retries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage; 