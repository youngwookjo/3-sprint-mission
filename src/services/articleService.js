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
    return await prisma.article.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    })
  },

  async createArticle(data) {
    return await prisma.article.create({
      data: {
        title: data.title,
        content: data.content || null,
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
  }
}

export default ArticleService;