export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  author: string;
  repository?: string;
  documentation?: string;
  install_command?: string;
  usage_examples?: string[];
  created_at: Date;
  updated_at: Date;
  downloads?: number;
  rating?: number;
}



export interface SearchQuery {
  q: string;
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
} 