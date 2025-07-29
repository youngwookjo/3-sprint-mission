import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ProductService = {
  async getProductList({ offset = '0', limit = '10', orderBy = undefined, keyword = '' } = {}) {
    const where = {};
    if (keyword) {
      where.OR = [
        { name: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ]
    }
    const data = await prisma.product.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      where,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      }
    })
    const total = await prisma.product.count({
      where,
    })
    const pages = Math.ceil(total / parseInt(limit));
    return {
      data,
      meta: {
        total,
        pages,
        offset: parseInt(offset),
        limit: parseInt(limit),
      }
    }
  },

  async getProduct(id) {
    const data = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
        userId: true,
      }
    })
    if (!data) {
      const error = new Error('상품을 찾을 수 없습니다.');
      error.status = 404;
      throw error;
    }
    return data;
  },

  async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        tags: data.tags || [],
        user: {
          connect: { id: data.userId },
        },
      },
    })
  },

  async patchProduct(id, data) {
    return await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        tags: data.tags || [],
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      }
    })
  },

  async deleteProduct(id) {
    return await prisma.product.delete({ where: { id } });
  },

  async likeProduct(userId, productId) {
    try {
      await prisma.productLike.create({
        data: {
          userId,
          productId,
        },
      })
    } catch (error) {
      if (error.code === 'P2002') {
        const error = new Error('이미 좋아요한 상품입니다.');
        error.status = 409;
        throw error;
      }
    }
    return true;
  },

  async unlikeProduct(userId, productId) {
    await prisma.productLike.delete({
      where: {
        userId_productId: { userId, productId },
      },
    })
  },

  async getProductWithLike(userId, productId) {
    const data = await this.getProduct(productId);
    const isLiked = await prisma.productLike.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
    data.isLiked = !!isLiked;
    return data;
  }
}

export default ProductService;