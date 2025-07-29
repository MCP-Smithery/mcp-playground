import { Router, Request, Response } from 'express';
import { BlogPost, ApiResponse } from '../types';

const router = Router();

// Mock blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with MCP Tools',
    content: `# Getting Started with MCP Tools

Model Context Protocol (MCP) tools are revolutionizing how we interact with AI systems. These tools provide a standardized way to extend AI capabilities by connecting them to external data sources, APIs, and services.

## What are MCP Tools?

MCP tools are plugins that enable AI models to:
- Access real-time data
- Interact with external APIs
- Perform complex operations
- Integrate with existing workflows

## Why Use MCP Tools?

1. **Enhanced Capabilities**: Extend your AI beyond its training data
2. **Real-time Information**: Access current data and live services
3. **Automation**: Streamline complex workflows
4. **Integration**: Connect AI to your existing tech stack

## Getting Started

To start using MCP tools with Smithery.ai:

1. Browse our tool catalog
2. Install the tools you need
3. Configure your AI workflows
4. Start building amazing applications

Stay tuned for more tutorials and guides!`,
    excerpt: 'Learn how to get started with Model Context Protocol (MCP) tools and enhance your AI workflows with real-time data and external integrations.',
    author: 'Sarah Chen',
    tags: ['mcp', 'tutorial', 'getting-started'],
    published: true,
    created_at: new Date('2024-01-20'),
    updated_at: new Date('2024-01-20'),
    featured_image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    slug: 'getting-started-with-mcp-tools'
  },
  {
    id: '2',
    title: 'Building Custom AI Tools: A Developer\'s Guide',
    content: `# Building Custom AI Tools: A Developer's Guide

Creating custom AI tools opens up endless possibilities for automation and intelligence in your applications. This guide will walk you through the process of building your own MCP-compatible tools.

## Prerequisites

Before you start building custom tools, make sure you have:
- Basic understanding of JavaScript/TypeScript
- Familiarity with REST APIs
- Understanding of AI model capabilities

## Tool Architecture

Every MCP tool consists of:
1. **Manifest**: Describes the tool's capabilities
2. **Implementation**: The actual logic and functionality
3. **Documentation**: Usage examples and API reference

## Step-by-Step Guide

### 1. Define Your Tool's Purpose

Start by clearly defining what your tool should accomplish:
- What problem does it solve?
- What inputs does it need?
- What outputs should it provide?

### 2. Create the Tool Structure

\`\`\`typescript
interface CustomTool {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (params: any) => Promise<any>;
}
\`\`\`

### 3. Implement the Logic

Write the core functionality that your tool will perform.

### 4. Test and Validate

Thoroughly test your tool with various inputs and edge cases.

### 5. Publish and Share

Once your tool is ready, you can publish it to the Smithery.ai marketplace.

## Best Practices

- Keep tools focused on a single responsibility
- Provide clear documentation and examples
- Handle errors gracefully
- Optimize for performance

Happy building!`,
    excerpt: 'A comprehensive guide for developers who want to create custom AI tools and integrate them with the MCP ecosystem.',
    author: 'Alex Rodriguez',
    tags: ['development', 'custom-tools', 'tutorial'],
    published: true,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-16'),
    featured_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    slug: 'building-custom-ai-tools-guide'
  },
  {
    id: '3',
    title: 'The Future of AI Tool Integration',
    content: `# The Future of AI Tool Integration

As AI becomes more sophisticated, the way we integrate tools and extend capabilities is evolving rapidly. Let's explore what the future holds for AI tool integration.

## Current State

Today's AI tools are primarily focused on:
- Text processing and generation
- Image analysis and creation
- Code generation and review
- Data analysis and insights

## Emerging Trends

### 1. Multi-Modal Integration
Future tools will seamlessly work across text, images, audio, and video.

### 2. Real-Time Collaboration
AI tools will collaborate with each other to solve complex problems.

### 3. Adaptive Learning
Tools will learn from usage patterns and improve over time.

### 4. Edge Computing
More tools will run locally for privacy and performance.

## Implications for Developers

- Focus on creating composable, modular tools
- Design for interoperability
- Consider privacy and security from the start
- Think about real-time and collaborative use cases

## Conclusion

The future of AI tool integration is bright, with unlimited possibilities for creating intelligent, interconnected systems that augment human capabilities.`,
    excerpt: 'Explore the emerging trends and future possibilities in AI tool integration, from multi-modal capabilities to edge computing.',
    author: 'Dr. Emily Watson',
    tags: ['future', 'ai-integration', 'trends'],
    published: true,
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-12'),
    featured_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
    slug: 'future-of-ai-tool-integration'
  }
];

// GET /api/blog - Fetch all blog posts
router.get('/', (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 0, published = 'true', tag } = req.query as any;
    
    let filteredPosts = [...mockBlogPosts];
    
    // Filter by published status
    if (published === 'true') {
      filteredPosts = filteredPosts.filter(post => post.published);
    }
    
    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(postTag => 
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }
    
    // Sort by creation date (newest first)
    filteredPosts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    
    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    const response: ApiResponse<BlogPost[]> = {
      success: true,
      data: paginatedPosts,
      meta: {
        total: filteredPosts.length,
        page: Math.floor(startIndex / parseInt(limit)) + 1,
        limit: parseInt(limit)
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
});

// GET /api/blog/:slug - Fetch a specific blog post by slug
router.get('/:slug', (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = mockBlogPosts.find(p => p.slug === slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }
    
    const response: ApiResponse<BlogPost> = {
      success: true,
      data: post
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog post'
    });
  }
});

// POST /api/blog - Create a new blog post
router.post('/', (req: Request, res: Response) => {
  try {
    const postData = req.body;
    
    if (!postData.title || !postData.content || !postData.author) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, content, author'
      });
    }
    
    // Generate slug from title
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      ...postData,
      slug,
      excerpt: postData.excerpt || postData.content.substring(0, 200) + '...',
      published: postData.published || false,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    mockBlogPosts.push(newPost);
    
    const response: ApiResponse<BlogPost> = {
      success: true,
      data: newPost
    };
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create blog post'
    });
  }
});

export default router; 