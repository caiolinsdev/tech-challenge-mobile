import { useState, useEffect, useCallback } from 'react';
import { studentsService, Student } from '../services/students';

// ==========================================
// Tipos
// ==========================================

interface UseStudentsOptions {
  initialPage?: number;
  limit?: number;
}

interface UseStudentsReturn {
  students: Student[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
}

// ==========================================
// Hook - Lista de Estudantes
// ==========================================

export function useStudents(options: UseStudentsOptions = {}): UseStudentsReturn {
  const { initialPage = 1, limit = 10 } = options;

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const hasMore = currentPage < totalPages;

  const fetchStudents = useCallback(
    async (page: number, isRefresh: boolean = false) => {
      try {
        setError(null);
        const response = await studentsService.list({ page, limit });
        const { data, meta } = response.data;

        if (isRefresh || page === 1) {
          setStudents(data);
        } else {
          setStudents((prev) => [...prev, ...data]);
        }

        setCurrentPage(meta.page);
        setTotalPages(meta.totalPages);
      } catch (err) {
        setError(err as Error);
      }
    },
    [limit]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchStudents(1, true).finally(() => setIsLoading(false));
  }, [fetchStudents]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    await fetchStudents(1, true);
    setIsRefreshing(false);
  }, [fetchStudents]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    await fetchStudents(currentPage + 1);
    setIsLoadingMore(false);
  }, [currentPage, hasMore, isLoadingMore, fetchStudents]);

  return {
    students,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    currentPage,
    totalPages,
    refresh,
    loadMore,
  };
}
