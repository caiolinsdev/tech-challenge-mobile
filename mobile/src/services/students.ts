import { api } from './api';

// ==========================================
// Tipos
// ==========================================

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollment: string | null;
  grade: string | null;
  createdAt: string;
}

export interface StudentDetail {
  id: string;
  name: string;
  email: string;
  enrollment: string | null;
  grade: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentData {
  name: string;
  email: string;
  password: string;
  enrollment?: string;
  grade?: string;
}

export interface UpdateStudentData {
  name?: string;
  enrollment?: string;
  grade?: string;
}

interface StudentsResponse {
  data: Student[];
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

export const studentsService = {
  list: (params: PaginationParams = {}) =>
    api.get<StudentsResponse>('/students', { params }),

  getById: (id: string) =>
    api.get<StudentDetail>(`/students/${id}`),

  create: (data: CreateStudentData) =>
    api.post('/students', data),

  update: (id: string, data: UpdateStudentData) =>
    api.put(`/students/${id}`, data),

  delete: (id: string) =>
    api.delete(`/students/${id}`),
};
