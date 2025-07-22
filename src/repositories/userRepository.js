import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findbyEmail = async (email) => {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: { email },
    });
  } catch (error) {
    error.status = 500;
    error.message = '이메일로 사용자 조회 중 오류가 발생했습니다.';
    throw error;
  }
}

const findById = async (id) => {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
    });
  } catch (error) {
    error.status = 500;
    error.message = '사용자 조회 중 오류가 발생했습니다.';
    throw error;
  }
}

const createUser = async (user) => {
  try {
    return await prisma.user.create({
      data: {
        email: user.email,
        nickname: user.nickname,
        password: user.password,
        image: user.image || null, // 이미지가 없을 경우 null로 설정
      },
    });
  } catch (error) {
    error.status = 500;
    error.message = '사용자 생성 중 오류가 발생했습니다.';
    throw error;
  }
}

const updateUser = async (id, data) => {
  try{
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
} catch (error) {
    error.status = 500;
    error.message = '사용자 업데이트 중 오류가 발생했습니다.';
    throw error;
  }
}

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

export default {
  findbyEmail,
  createUser,
  updateUser,
  findById,
  getUserRegisteredProducts
}