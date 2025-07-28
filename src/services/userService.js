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