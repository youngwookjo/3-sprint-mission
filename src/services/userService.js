import { z } from "zod";
import userRepository from "../repositories/userRepository.js"
import productRepository from "../repositories/productRepository.js";
import { hashPassword } from "../utils/passwordUtil.js";
import { checkUser } from "../utils/checkUser.js";

const filterSensitiveUserData = (user) => {
  const { password, refreshToken, ...rest } = user
  return rest
}

const userCreate = async (user) => {
  const existedUser = await userRepository.findbyEmail(user.email);
  if (existedUser) {
    const error = new Error('이미 존재하는 이메일입니다.');
    error.status = 409;
    throw error;
  }
  const userSchema = z.object({
    email: z.email({ message: '유효한 이메일을 입력해주세요.' }),
    nickname: z.string()
      .min(1, { message: '닉네임은 1자 이상이어야 합니다.' })
      .max(8, { message: '닉네임은 8자 이하이어야 합니다.' }),
    password: z.string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하이어야 합니다.' }),
  });
  const validation = userSchema.safeParse(user);
  if (!validation.success) {
    const error = new Error(validation.error.issues.map(issue => issue.message));
    error.status = 400;
    throw error;
  }
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  const createUser = await userRepository.createUser(user);
  return filterSensitiveUserData(createUser);
}

const updateUser = async (id, data) => {
  const user = await userRepository.updateUser(id, data)
  return filterSensitiveUserData(user);
}

const getUser = async (userId) => {
  const user = await checkUser(userId);
  return filterSensitiveUserData(user);
}

const getUserRegisteredProducts = async (userId) => {
  const user = await checkUser(userId);
  const products = await productRepository.getUserRegisteredProducts(userId);
  const data = { userEmail: user.email, userNickname: user.nickname, products };
  return data;
}

const getUserLikedProducts = async (userId) => {
  await checkUser(userId);
  const products = await productRepository.getUserLikedProducts(userId);
  return products;
}

export default {
  userCreate,
  updateUser,
  getUser,
  getUserRegisteredProducts,
  getUserLikedProducts
}