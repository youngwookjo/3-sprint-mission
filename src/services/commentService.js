import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CommentService = {
  async getCommentList(id, { cursor, limit = '10' } = {}) {
    return await prisma.comment.findMany({
      take: parseInt(limit),
      ...(cursor && {
        cursor: { id: cursor }, skip: 1,
      }),
      where: {
        ...id
      },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
      }
    })
  },

  async createComment(id, data) {
    return await prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        ...id,
      },
    })
  },

  async getComment(id) {
    return await prisma.comment.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        userId: true,
      }
    })
  },

  async patchComment(id, data) {
    return await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      }
    })
  },

  async deleteComment(id) {
    return await prisma.comment.delete({
      where: { id },
    })
  },
}

export default CommentService;