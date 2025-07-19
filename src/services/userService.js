import { z } from "zod";
import userRepository from "../repositories/userRepository"
import { filterSensitiveUserData } from "../utils/filterSensitiveUserData.js";
import { hashPassword, isPasswordValid } from "../utils/passwordUtil.js";


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

export default {
  userCreate,
}