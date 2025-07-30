import prisma from '../config/prisma.js';

const getUserRegisteredProducts = async (userId) => {
  try {
    return await prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      }
    });
  } catch (error) {
    error.status = 500;
    error.message = '사용자가 등록한 상품 조회 중 오류가 발생했습니다.';
    throw error;
  }
}

const getUserLikedProducts = async (userId) => {
  try {
    return await prisma.product.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      }
    });
  } catch (error) {
    error.status = 500;
    error.message = '사용자가 좋아요한 상품 조회 중 오류가 발생했습니다.';
    throw error;
  }
}

export default {
  getUserRegisteredProducts,
  getUserLikedProducts,
}