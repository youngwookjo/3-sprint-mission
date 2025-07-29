import { z } from "zod";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js"
import { hashPassword, isPasswordValid } from "../utils/passwordUtil.js";
import { checkUser } from "../utils/checkUser.js";

const login = async (email, password) => {
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
  const accessToken = createToken(user, 'access');
  const refreshToken = createToken(user, 'refresh');
  await userRepository.updateUser(user.id, { refreshToken });
  return { accessToken, refreshToken };
}

const changePassword = async (userId, newPassword, oldPassword) => {
  const user = await checkUser(userId);
  const isValidPassword = await isPasswordValid(oldPassword, user.password);
  if (!isValidPassword) {
    const error = new Error('현재 비밀번호가 일치하지 않습니다.');
    error.status = 401;
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
  await userRepository.updateUser(userId, { password: hashedNewPassword });
  return true;
}

const createToken = (user, type = 'access') => {
  const payLoad = { userId: user.id }
  const jwtSecret = type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  const expiresIn = type === 'access' ? '1h' : '2w';
  return jwt.sign(payLoad, jwtSecret, { expiresIn })
}

const tokenRefresh = async (userId, refreshToken) => {
  const user = await checkUser(userId);
  if (user.refreshToken !== refreshToken) {
    const error = new Error('유효하지 않은 리프레시 토큰입니다.');
    error.status = 401;
    throw error;
  }
  return createToken(user, 'access');
}

export default {
  login,
  changePassword,
  tokenRefresh,
}