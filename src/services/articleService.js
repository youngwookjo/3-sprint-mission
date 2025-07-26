import { PrismaClient } from '@prisma/client';
import { ar } from 'zod/locales';
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
    const data = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
      }
    });

    if (!data) {
      const error = new Error('게시글을 찾을 수 없습니다.');
      error.status = 404;
      throw error;
    }
    return data;
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
    try {
      await prisma.articleLike.create({
        data: {
          userId,
          articleId,
        },
      })
    } catch (error) {
      if (error.code === 'P2002') {
        const error = new Error('이미 좋아요한 게시글입니다.');
        error.status = 409;
        throw error;
      }
    }
  },

  async unlikeArticle(userId, articleId) {
    await prisma.articleLike.delete({
      where: {
        userId_articleId: { userId, articleId },
      },
    })
  },

  async getArticleWithLike(userId, articleId) {
    const data = await this.getArticle(articleId);
    const isLiked = await prisma.articleLike.findUnique({
      where: {
        userId_articleId: { userId, articleId },
      },
    });

    data.isLiked = !!isLiked;
    return data;
  }
}

export default ArticleService;