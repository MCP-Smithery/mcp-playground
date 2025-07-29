import axios from 'axios';
import { Tool, BlogPost, ContactMessage, DocumentationSection, ApiResponse, SearchQuery } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tools API
export const toolsApi = {
  getAll: async (params?: SearchQuery): Promise<ApiResponse<Tool[]>> => {
    const response = await api.get('/tools', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Tool>> => {
    const response = await api.get(`/tools/${id}`);
    return response.data;
  },

  create: async (tool: Partial<Tool>): Promise<ApiResponse<Tool>> => {
    const response = await api.post('/tools', tool);
    return response.data;
  },

  update: async (id: string, updates: Partial<Tool>): Promise<ApiResponse<Tool>> => {
    const response = await api.put(`/tools/${id}`, updates);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/tools/${id}`);
    return response.data;
  },
};

// Blog API
export const blogApi = {
  getAll: async (params?: { limit?: number; offset?: number; tag?: string }): Promise<ApiResponse<BlogPost[]>> => {
    const response = await api.get('/blog', { params });
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },

  create: async (post: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    const response = await api.post('/blog', post);
    return response.data;
  },
};

// Documentation API
export const docsApi = {
  getAll: async (category?: string): Promise<ApiResponse<DocumentationSection[]>> => {
    const response = await api.get('/documentation', { params: { category } });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<DocumentationSection>> => {
    const response = await api.get(`/documentation/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get('/documentation/meta/categories');
    return response.data;
  },
};

// Contact API
export const contactApi = {
  submit: async (message: ContactMessage): Promise<ApiResponse<{ id: string; message: string }>> => {
    const response = await api.post('/contact', message);
    return response.data;
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; timestamp: string; version: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 