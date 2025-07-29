import { Router, Request, Response } from 'express';
import { ContactMessage, ApiResponse } from '../types';

const router = Router();

// Mock storage for contact messages
const mockMessages: ContactMessage[] = [];

// POST /api/contact - Submit a contact message
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: name, email, subject, message'
      });
    }
    
    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }
    
    // Message length validation
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters long'
      });
    }
    
    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be less than 5000 characters'
      });
    }
    
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      created_at: new Date(),
      status: 'new'
    };
    
    mockMessages.push(newMessage);
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to support team
    // 3. Send confirmation email to user
    
    console.log('New contact message received:', {
      id: newMessage.id,
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject
    });
    
    const response: ApiResponse<{ id: string; message: string }> = {
      success: true,
      data: {
        id: newMessage.id,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
      }
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact messages (admin only)
router.get('/', (req: Request, res: Response) => {
  try {
    // In a real application, you would check for admin authentication here
    const { status, limit = 10, offset = 0 } = req.query as any;
    
    let filteredMessages = [...mockMessages];
    
    // Filter by status if provided
    if (status && ['new', 'read', 'replied'].includes(status)) {
      filteredMessages = filteredMessages.filter(msg => msg.status === status);
    }
    
    // Sort by creation date (newest first)
    filteredMessages.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    
    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedMessages = filteredMessages.slice(startIndex, endIndex);
    
    const response: ApiResponse<ContactMessage[]> = {
      success: true,
      data: paginatedMessages,
      meta: {
        total: filteredMessages.length,
        page: Math.floor(startIndex / parseInt(limit)) + 1,
        limit: parseInt(limit)
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact messages'
    });
  }
});

// PUT /api/contact/:id - Update message status (admin only)
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: new, read, replied'
      });
    }
    
    const messageIndex = mockMessages.findIndex(msg => msg.id === id);
    
    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    
    mockMessages[messageIndex].status = status;
    
    const response: ApiResponse<ContactMessage> = {
      success: true,
      data: mockMessages[messageIndex]
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update contact message'
    });
  }
});

export default router; 