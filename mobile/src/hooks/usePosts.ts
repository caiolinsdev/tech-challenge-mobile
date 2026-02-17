import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

// ==========================================
// Tipos
// ==========================================

export interface Post {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export interface PostDetail extends Post {
  content: string;
  published: boolean;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    bio: string | null;
  };
}

interface PostsResponse {
  data: Post[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UsePostsOptions {
  search?: string;
  initialPage?: number;
  limit?: number;
}

interface UsePostsReturn {
  posts: Post[];
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
// Hook
// ==========================================

export function usePosts(options: UsePostsOptions = {}): UsePostsReturn {
  const { search = '', initialPage = 1, limit = 10 } = options;

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const hasMore = currentPage < totalPages;

  // Função para buscar posts
  const fetchPosts = useCallback(
    async (page: number, isRefresh: boolean = false) => {
      try {
        setError(null);

        const endpoint = search
          ? `/posts/search?q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
          : `/posts?page=${page}&limit=${limit}`;

        const response = await api.get<PostsResponse>(endpoint);
        const { data, meta } = response.data;

        if (isRefresh || page === 1) {
          setPosts(data);
        } else {
          setPosts((prev) => [...prev, ...data]);
        }

        setCurrentPage(meta.page);
        setTotalPages(meta.totalPages);
      } catch (err) {
        setError(err as Error);
      }
    },
    [search, limit]
  );

  // Carregar posts iniciais
  useEffect(() => {
    setIsLoading(true);
    setPosts([]);
    setCurrentPage(1);
    fetchPosts(1, true).finally(() => setIsLoading(false));
  }, [search, fetchPosts]);

  // Função de refresh (pull-to-refresh)
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    await fetchPosts(1, true);
    setIsRefreshing(false);
  }, [fetchPosts]);

  // Função para carregar mais (infinite scroll)
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    await fetchPosts(currentPage + 1);
    setIsLoadingMore(false);
  }, [currentPage, hasMore, isLoadingMore, fetchPosts]);

  return {
    posts,
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

// ==========================================
// Hook para buscar um post específico
// ==========================================

interface UsePostReturn {
  post: PostDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePost(id: string): UsePostReturn {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get<PostDetail>(`/posts/${id}`);
      setPost(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    isLoading,
    error,
    refetch: fetchPost,
  };
}

