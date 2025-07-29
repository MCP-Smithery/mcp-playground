import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types';

const router = Router();

interface DocumentationSection {
  id: string;
  title: string;
  content: string;
  category: string;
  order: number;
  last_updated: Date;
}

// Mock documentation data
const mockDocs: DocumentationSection[] = [
  {
    id: '1',
    title: 'Quick Start Guide',
    content: `# Quick Start Guide

Welcome to Smithery.ai! This guide will help you get up and running with AI tools in minutes.

## Installation

\`\`\`bash
npm install -g @smithery/cli
\`\`\`

## Your First Tool

1. **Browse the catalog**: Visit our tools page to explore available AI tools
2. **Install a tool**: Use the CLI to install your first tool
3. **Configure**: Set up any required API keys or configurations
4. **Use**: Start integrating AI capabilities into your workflow

## Example Usage

\`\`\`bash
# Install the GitHub analyzer tool
smithery install github-analyzer

# Analyze a repository
smithery github-analyzer --repo microsoft/vscode
\`\`\`

## Next Steps

- Explore our [Tool Catalog](/tools)
- Read the [API Reference](/docs/api)
- Join our [Community](/community)

Need help? Check out our [FAQ](/docs/faq) or [contact us](/contact).`,
    category: 'Getting Started',
    order: 1,
    last_updated: new Date('2024-01-20')
  },
  {
    id: '2',
    title: 'API Reference',
    content: `# API Reference

The Smithery.ai API provides programmatic access to our platform and tools.

## Authentication

All API requests require authentication using an API key:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.smithery.ai/v1/tools
\`\`\`

## Base URL

All API requests should be made to:
\`\`\`
https://api.smithery.ai/v1
\`\`\`

## Endpoints

### Tools

#### GET /tools
List all available tools with optional filtering.

**Parameters:**
- \`category\` (string): Filter by tool category
- \`tag\` (string): Filter by tag
- \`limit\` (number): Number of results to return (default: 10)
- \`offset\` (number): Number of results to skip (default: 0)

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "tool-123",
      "name": "GitHub Analyzer",
      "description": "Analyze GitHub repositories",
      "category": "Development",
      "tags": ["github", "analysis"],
      "version": "1.2.0"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
\`\`\`

#### GET /tools/:id
Get detailed information about a specific tool.

#### POST /tools
Create a new tool (admin only).

#### PUT /tools/:id
Update an existing tool (admin only).

#### DELETE /tools/:id
Delete a tool (admin only).

### Blog

#### GET /blog
List blog posts.

#### GET /blog/:slug
Get a specific blog post by slug.

### Documentation

#### GET /documentation
Get documentation sections.

## Rate Limits

API requests are limited to 100 requests per 15-minute window per IP address.

## Error Handling

The API uses standard HTTP status codes:

- \`200\` - Success
- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`404\` - Not Found
- \`429\` - Rate Limit Exceeded
- \`500\` - Internal Server Error

Error responses include a descriptive message:

\`\`\`json
{
  "success": false,
  "error": "Tool not found"
}
\`\`\``,
    category: 'API',
    order: 2,
    last_updated: new Date('2024-01-18')
  },
  {
    id: '3',
    title: 'Tool Development Guide',
    content: `# Tool Development Guide

Learn how to create and publish your own AI tools on the Smithery.ai platform.

## Prerequisites

- Node.js 18+ or Python 3.8+
- Basic understanding of REST APIs
- Familiarity with your chosen programming language

## Tool Structure

Every Smithery.ai tool consists of:

1. **Manifest file** (\`smithery.json\`): Describes your tool
2. **Implementation**: Your tool's logic
3. **Documentation**: Usage examples and API docs
4. **Tests**: Automated tests for your tool

## Creating a Tool

### 1. Initialize Your Project

\`\`\`bash
mkdir my-awesome-tool
cd my-awesome-tool
smithery init
\`\`\`

### 2. Define Your Tool

Edit \`smithery.json\`:

\`\`\`json
{
  "name": "my-awesome-tool",
  "version": "1.0.0",
  "description": "An awesome AI tool that does amazing things",
  "category": "Productivity",
  "tags": ["automation", "productivity"],
  "author": "Your Name",
  "main": "index.js",
  "parameters": [
    {
      "name": "input",
      "type": "string",
      "description": "Input text to process",
      "required": true
    }
  ]
}
\`\`\`

### 3. Implement Your Tool

Create \`index.js\`:

\`\`\`javascript
module.exports = async function(params) {
  const { input } = params;
  
  // Your tool logic here
  const result = processInput(input);
  
  return {
    success: true,
    data: result
  };
};

function processInput(input) {
  // Implement your awesome functionality
  return \`Processed: \${input}\`;
}
\`\`\`

### 4. Test Your Tool

\`\`\`bash
smithery test
\`\`\`

### 5. Publish Your Tool

\`\`\`bash
smithery publish
\`\`\`

## Best Practices

- **Single Responsibility**: Each tool should do one thing well
- **Clear Documentation**: Provide comprehensive usage examples
- **Error Handling**: Handle edge cases gracefully
- **Performance**: Optimize for speed and resource usage
- **Security**: Validate inputs and sanitize outputs

## Tool Categories

- **Development**: Code analysis, generation, and review tools
- **Productivity**: Automation and workflow tools
- **AI**: Machine learning and AI-specific tools
- **Data**: Data processing and analysis tools
- **Integration**: API and service integration tools

## Publishing Guidelines

1. Test thoroughly before publishing
2. Include comprehensive documentation
3. Follow semantic versioning
4. Provide clear usage examples
5. Respond to user feedback promptly

## Support

Need help? Join our developer community or contact our support team.`,
    category: 'Development',
    order: 3,
    last_updated: new Date('2024-01-15')
  },
  {
    id: '4',
    title: 'FAQ',
    content: `# Frequently Asked Questions

## General Questions

### What is Smithery.ai?

Smithery.ai is a platform for building, sharing, and deploying AI tools. We provide a marketplace of AI-powered tools that can be integrated into your workflows to enhance productivity and automation.

### How do I get started?

1. Browse our [tool catalog](/tools) to find tools that interest you
2. Install the Smithery CLI: \`npm install -g @smithery/cli\`
3. Install and use tools: \`smithery install tool-name\`

### Is Smithery.ai free to use?

Yes! Smithery.ai offers a free tier that includes access to many tools and basic usage limits. We also offer paid plans with higher limits and premium features.

## Tool Usage

### How do I install a tool?

Use the Smithery CLI:
\`\`\`bash
smithery install tool-name
\`\`\`

### Can I use tools without the CLI?

Yes! Most tools can also be accessed via our REST API or integrated directly into your applications.

### How do I update tools?

\`\`\`bash
smithery update tool-name
# or update all tools
smithery update --all
\`\`\`

## Development

### Can I create my own tools?

Absolutely! Check out our [Tool Development Guide](/docs/development) to learn how to create and publish your own tools.

### What programming languages are supported?

We support tools written in JavaScript/Node.js and Python. Support for additional languages is coming soon.

### How do I publish a tool?

After developing your tool, use:
\`\`\`bash
smithery publish
\`\`\`

## Troubleshooting

### My tool isn't working. What should I do?

1. Check that you have the latest version: \`smithery update tool-name\`
2. Verify your API keys and configuration
3. Check our [status page](https://status.smithery.ai) for known issues
4. Contact support if the problem persists

### How do I report a bug?

You can report bugs through:
- GitHub issues on the specific tool's repository
- Our [contact form](/contact)
- Email us at support@smithery.ai

### Where can I get help?

- Documentation: [docs.smithery.ai](https://docs.smithery.ai)
- Community forum: [community.smithery.ai](https://community.smithery.ai)
- Email support: support@smithery.ai
- Discord: [discord.gg/smithery](https://discord.gg/smithery)

## Billing

### How does billing work?

We use a credit-based system. Each tool usage consumes credits based on the computational resources required.

### Can I monitor my usage?

Yes! Your dashboard shows real-time usage statistics and remaining credits.

### What happens if I exceed my limits?

Free tier users will need to wait for the next billing cycle or upgrade to a paid plan. Paid plan users can purchase additional credits.

Still have questions? [Contact us](/contact) and we'll be happy to help!`,
    category: 'Support',
    order: 4,
    last_updated: new Date('2024-01-22')
  }
];

// GET /api/documentation - Fetch all documentation sections
router.get('/', (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    let filteredDocs = [...mockDocs];
    
    // Filter by category if provided
    if (category) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.category.toLowerCase() === (category as string).toLowerCase()
      );
    }
    
    // Sort by order
    filteredDocs.sort((a, b) => a.order - b.order);
    
    const response: ApiResponse<DocumentationSection[]> = {
      success: true,
      data: filteredDocs
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch documentation'
    });
  }
});

// GET /api/documentation/:id - Fetch a specific documentation section
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = mockDocs.find(d => d.id === id);
    
    if (!doc) {
      return res.status(404).json({
        success: false,
        error: 'Documentation section not found'
      });
    }
    
    const response: ApiResponse<DocumentationSection> = {
      success: true,
      data: doc
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch documentation section'
    });
  }
});

// GET /api/documentation/categories - Get all documentation categories
router.get('/meta/categories', (req: Request, res: Response) => {
  try {
    const categories = [...new Set(mockDocs.map(doc => doc.category))];
    
    const response: ApiResponse<string[]> = {
      success: true,
      data: categories
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch documentation categories'
    });
  }
});

export default router; 