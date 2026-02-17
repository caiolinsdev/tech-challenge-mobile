import { api } from './api';

// ==========================================
// Tipos
// ==========================================

export interface CreatePostData {
  title: string;
  content: string;
  description?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  description?: string;
}

// ==========================================
// Service
// ==========================================

export const postsService = {
  listMine: (params: { page?: number; limit?: number } = {}) =>
    api.get('/posts/mine', { params }),

  create: (data: CreatePostData) =>
    api.post('/posts', data),

  update: (id: string, data: UpdatePostData) =>
    api.put(`/posts/${id}`, data),

  delete: (id: string) =>
    api.delete(`/posts/${id}`),
};
