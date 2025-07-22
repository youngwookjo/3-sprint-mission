import { z } from "zod";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js"
import { hashPassword, isPasswordValid } from "../utils/passwordUtil.js";

const filterSensitiveUserData = (user) => {
  const { password, ...rest } = user
  return rest
}

const userCreate = async (user) => {
  const existedUser = await userRepository.findbyEmail(user.email);
  if (existedUser) {
    const error = new Error('이미 존재하는 이메일입니다.');
    error.status = 409;
    throw error;
  }
  const passwordSchema = z.string().min(8).max(20);
  const passwordValidation = passwordSchema.safeParse(user.password);
  if (!passwordValidation.success) {
    const error = new Error("비밀번호는 8자 이상 20자 이하로 입력해야 합니다.");
    error.status = 400;
    throw error;
  }
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  const createUser = await userRepository.createUser(user);
  return filterSensitiveUserData(createUser);
}

const userLogin = async (email, password) => {
  const user = await userRepository.findbyEmail(email);
  if (!user) {
    const error = new Error('존재하지 않는 유저입니다.');
    error.status = 404;
    throw error;
  }
  const isValidPassword = await isPasswordValid(password, user.password);
  if (!isValidPassword) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.status = 401;
    throw error;
  }
  return filterSensitiveUserData(user);
}

const createToken = (user, type) => {
    const payLoad = { userId: user.id }
  const jwtSecret = type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  const expiresIn = type === 'access' ? '1h' : '2w';
  return jwt.sign(payLoad, jwtSecret, { expiresIn })
}

const updateUser = async (id, data) => {
  const { userId = data.id, email, password, newPassword, refreshToken, createdAt, updatedAt, ...safeData } = data;
  const user = await userRepository.updateUser(id, safeData)
  return filterSensitiveUserData(user);
}

const updateUserRefreshToken = async (id, data) => {
  const refreshToken = { refreshToken: data.refreshToken };
  const user = await userRepository.updateUser(id, refreshToken)
  return filterSensitiveUserData(user);
}

const refreshToken = async (userId, refreshToken) => {
  const user = await userRepository.findById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error('유효하지 않은 리프레시 토큰입니다.');
    error.status = 401;
    throw error;
  }
  return createToken(user)
}

const tokenGetUser = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('존재하지 않는 유저입니다.');
    error.status = 404;
    throw error;
  }
  return filterSensitiveUserData(user);
}

const userChangePassword = async (userId, newPassword) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('존재하지 않는 유저입니다.');
    error.status = 404;
    throw error;
  }

  const passwordSchema = z.string().min(8).max(20);
  const passwordValidation = passwordSchema.safeParse(newPassword);
  if (!passwordValidation.success) {
    const error = new Error("새 비밀번호는 8자 이상 20자 이하로 입력해야 합니다.");
    error.status = 400;
    throw error;
  }
  const hashedNewPassword = await hashPassword(newPassword);
  return updateUser(userId, { password: hashedNewPassword });
}

const getUserRegisteredProducts = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('존재하지 않는 유저입니다.');
    error.status = 404;
    throw error;
  }
  const products = await userRepository.getUserRegisteredProducts(userId);
  const data = {userEmail: user.email,userNickname: user.nickname , products};
  return data;
}

export default {
  userCreate,
  userLogin,
  createToken,
  updateUser,
  refreshToken,
  tokenGetUser,
  userChangePassword,
  getUserRegisteredProducts,
  updateUserRefreshToken
}