import { PrismaClient } from '@prisma/client';
import { th } from 'zod/locales';

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

  async getproduct(id) {
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

  async likeProduct(productId, userId) {
    return await prisma.productLike.create({
      data: {
        userId,
        productId,
      },
    })
  },

  async unlikeProduct(productId, userId) {
    await prisma.productLike.delete({
      where: {
        userId_productId: { userId, productId },
      },
    })
  },

  async getProductWithLike(id, userId) {
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
        likes: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!data) {
      error.status = 404;
      error.message = '상품을 찾을 수 없습니다.';
      throw error;
    }

    const isLiked = !!data.likes.length
    const { likes, ...product } = data;
    return { ...product, isLiked };
  }
}

export default ProductService;