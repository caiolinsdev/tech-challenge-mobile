import { prisma } from '../utils/prisma';
import { NotFoundError } from '../middlewares/errorHandler';

// ==========================================
// Tipos
// ==========================================

interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

interface PostsListResponse {
  data: PostListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PostListItem {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  author: {
    id: string;
    name: string;
  };
}

interface PostDetail {
  id: string;
  title: string;
  content: string;
  description: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    bio: string | null;
  };
}

// ==========================================
// Service
// ==========================================

export class PostsService {
  /**
   * Lista posts com paginação
   */
  async list(params: PaginationParams = {}): Promise<PostsListResponse> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      order = 'desc',
    } = params;

    const skip = (page - 1) * limit;

    // Buscar posts e total em paralelo
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { [orderBy]: order },
        skip,
        take: limit,
      }),
      prisma.post.count({ where: { published: true } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.user.name,
        },
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Busca posts por termo
   */
  async search(
    query: string,
    params: PaginationParams = {}
  ): Promise<PostsListResponse> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const where = {
      published: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { content: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
      ],
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
        author: {
          id: post.author.id,
          name: post.author.user.name,
        },
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Busca um post pelo ID
   */
  async getById(id: string): Promise<PostDetail> {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        description: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            bio: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundError('Post');
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      description: post.description,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: {
        id: post.author.id,
        name: post.author.user.name,
        bio: post.author.bio,
      },
    };
  }
}

