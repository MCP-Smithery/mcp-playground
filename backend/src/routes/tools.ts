import { Router, Request, Response } from 'express';
import { Tool, ApiResponse, SearchQuery } from '../types';

const router = Router();

// Mock data for development
const mockTools: Tool[] = [
  {
    id: '1',
    name: 'GitHub Repository Analyzer',
    description: 'Analyze GitHub repositories for code quality, security issues, and documentation completeness',
    category: 'Development',
    tags: ['github', 'analysis', 'code-quality'],
    version: '1.2.0',
    author: 'Smithery Team',
    repository: 'https://github.com/smithery-ai/github-analyzer',
    documentation: 'https://docs.smithery.ai/tools/github-analyzer',
    install_command: 'npm install @smithery/github-analyzer',
    usage_examples: [
      'smithery github-analyzer --repo owner/repo-name',
      'smithery github-analyzer --url https://github.com/owner/repo'
    ],
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-20'),
    downloads: 1250,
    rating: 4.8
  },
  {
    id: '2',
    name: 'AI Code Reviewer',
    description: 'Automated code review using AI to detect bugs, suggest improvements, and enforce coding standards',
    category: 'AI',
    tags: ['ai', 'code-review', 'automation'],
    version: '2.1.3',
    author: 'Smithery Team',
    repository: 'https://github.com/smithery-ai/ai-reviewer',
    documentation: 'https://docs.smithery.ai/tools/ai-reviewer',
    install_command: 'npm install @smithery/ai-reviewer',
    usage_examples: [
      'smithery ai-review --file src/app.js',
      'smithery ai-review --directory src/'
    ],
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-01-25'),
    downloads: 2100,
    rating: 4.9
  },
  {
    id: '3',
    name: 'API Documentation Generator',
    description: 'Generate comprehensive API documentation from code comments and endpoint definitions',
    category: 'Documentation',
    tags: ['api', 'documentation', 'openapi'],
    version: '1.0.5',
    author: 'Smithery Team',
    repository: 'https://github.com/smithery-ai/api-docs-gen',
    documentation: 'https://docs.smithery.ai/tools/api-docs-gen',
    install_command: 'npm install @smithery/api-docs-gen',
    usage_examples: [
      'smithery api-docs --input src/routes --output docs/',
      'smithery api-docs --format openapi --version 3.0'
    ],
    created_at: new Date('2024-01-05'),
    updated_at: new Date('2024-01-18'),
    downloads: 850,
    rating: 4.6
  }
];

// GET /api/tools - Fetch all tools with optional search and filtering
router.get('/', (req: Request, res: Response) => {
  try {
    const { q, category, tags, limit = 10, offset = 0 } = req.query as any;
    
    let filteredTools = [...mockTools];
    
    // Search by name or description
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredTools = filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by category
    if (category) {
      filteredTools = filteredTools.filter(tool => 
        tool.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filteredTools = filteredTools.filter(tool =>
        tagArray.some((tag: string) => 
          tool.tags.some(toolTag => 
            toolTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }
    
    // Pagination
    const startIndex = parseInt(offset as string);
    const endIndex = startIndex + parseInt(limit as string);
    const paginatedTools = filteredTools.slice(startIndex, endIndex);
    
    const response: ApiResponse<Tool[]> = {
      success: true,
      data: paginatedTools,
      meta: {
        total: filteredTools.length,
        page: Math.floor(startIndex / parseInt(limit as string)) + 1,
        limit: parseInt(limit as string)
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools'
    });
  }
});

// GET /api/tools/:id - Fetch a specific tool by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tool = mockTools.find(t => t.id === id);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }
    
    const response: ApiResponse<Tool> = {
      success: true,
      data: tool
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tool'
    });
  }
});

// POST /api/tools - Create a new tool
router.post('/', (req: Request, res: Response) => {
  try {
    const toolData = req.body;
    
    // Basic validation
    if (!toolData.name || !toolData.description || !toolData.category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, description, category'
      });
    }
    
    const newTool: Tool = {
      id: Date.now().toString(),
      ...toolData,
      created_at: new Date(),
      updated_at: new Date(),
      downloads: 0,
      rating: 0
    };
    
    mockTools.push(newTool);
    
    const response: ApiResponse<Tool> = {
      success: true,
      data: newTool
    };
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create tool'
    });
  }
});

// PUT /api/tools/:id - Update a tool
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const toolIndex = mockTools.findIndex(t => t.id === id);
    
    if (toolIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }
    
    mockTools[toolIndex] = {
      ...mockTools[toolIndex],
      ...updates,
      updated_at: new Date()
    };
    
    const response: ApiResponse<Tool> = {
      success: true,
      data: mockTools[toolIndex]
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update tool'
    });
  }
});

// DELETE /api/tools/:id - Delete a tool
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const toolIndex = mockTools.findIndex(t => t.id === id);
    
    if (toolIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found'
      });
    }
    
    mockTools.splice(toolIndex, 1);
    
    res.json({
      success: true,
      data: { message: 'Tool deleted successfully' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete tool'
    });
  }
});

export default router; 