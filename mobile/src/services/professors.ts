import { api } from './api';

// ==========================================
// Tipos
// ==========================================

export interface Professor {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  subject: string | null;
  postsCount: number;
  createdAt: string;
}

export interface ProfessorDetail {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  subject: string | null;
  posts: { id: string; title: string }[];
  createdAt: string;
}

export interface CreateProfessorData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  subject?: string;
}

export interface UpdateProfessorData {
  name?: string;
  bio?: string;
  subject?: string;
}

interface ProfessorsResponse {
  data: Professor[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PaginationParams {
  page?: number;
  limit?: number;
}

// ==========================================
// Service
// ==========================================

export const professorsService = {
  list: (params: PaginationParams = {}) =>
    api.get<ProfessorsResponse>('/professors', { params }),

  getById: (id: string) =>
    api.get<ProfessorDetail>(`/professors/${id}`),

  create: (data: CreateProfessorData) =>
    api.post('/professors', data),

  update: (id: string, data: UpdateProfessorData) =>
    api.put(`/professors/${id}`, data),

  delete: (id: string) =>
    api.delete(`/professors/${id}`),
};
