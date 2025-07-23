import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ArticleService = {
  async getArticleList({ offset = '0', limit = '10', orderBy = undefined } = {}) {
    return await prisma.article.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    })
  },

  async getArticle(id) {
    return await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
      }
    })
  },

  async createArticle(data) {
    return await prisma.article.create({
      data: {
        title: data.title,
        content: data.content || null,
        user: {
          connect: { id: data.userId }
        }
      },
    })
  },

  async patchArticle(id, data) {
    return await prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content || null,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    })
  },

  async deleteArticle(id) {
    return await prisma.article.delete({
      where: { id },
    })
  },

  async likeArticle(userId, articleId) {
    return await prisma.articleLike.create({
      data: {
        userId,
        articleId,
      },
    })
  },

  async unlikeArticle(userId, articleId) {
    await prisma.articleLike.delete({
      where: {
        userId_articleId: { userId, articleId },
      },
    })
  },

  async getArticleWithLike(userId, articleId) {
    const select = {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      userId: true,
    }

    if (userId) {
      select.likes = {
        where: { userId },
        select: { id: true }
      }
    }

    const data = await prisma.article.findUnique({
      where: { id: articleId },
      select,
    });

    if (!data) {
      const error = new Error('게시글을 찾을 수 없습니다.');
      error.status = 404;
      throw error;
    }

    const isLiked = !!data.likes.length
    const { likes, ...article } = data;

    return { ...article, isLiked};
  }
}



export default ArticleService;