import { useState, useEffect, useCallback } from 'react';
import { professorsService, Professor } from '../services/professors';

// ==========================================
// Tipos
// ==========================================

interface UseProfessorsOptions {
  initialPage?: number;
  limit?: number;
}

interface UseProfessorsReturn {
  professors: Professor[];
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
// Hook - Lista de Professores
// ==========================================

export function useProfessors(options: UseProfessorsOptions = {}): UseProfessorsReturn {
  const { initialPage = 1, limit = 10 } = options;

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const hasMore = currentPage < totalPages;

  const fetchProfessors = useCallback(
    async (page: number, isRefresh: boolean = false) => {
      try {
        setError(null);
        const response = await professorsService.list({ page, limit });
        const { data, meta } = response.data;

        if (isRefresh || page === 1) {
          setProfessors(data);
        } else {
          setProfessors((prev) => [...prev, ...data]);
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
    fetchProfessors(1, true).finally(() => setIsLoading(false));
  }, [fetchProfessors]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    await fetchProfessors(1, true);
    setIsRefreshing(false);
  }, [fetchProfessors]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    await fetchProfessors(currentPage + 1);
    setIsLoadingMore(false);
  }, [currentPage, hasMore, isLoadingMore, fetchProfessors]);

  return {
    professors,
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
