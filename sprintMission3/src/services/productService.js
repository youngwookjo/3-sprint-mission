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
    return await prisma.product.findMany({
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
  },

  async getproduct(id) {
    return await prisma.product.findUniqueOrThrow({
      where: { id },
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

  async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        tags: data.tags || [],
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
}

export default ProductService;