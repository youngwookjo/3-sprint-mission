import userRepository from "../repositories/userRepository.js";

export const checkUser = async (userId) => {
  if (!userId) {
    const error = new Error('유저 ID가 없습니다');
    error.status = 401;
    throw error;
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    const error = new Error('존재하지 않는 유저입니다');
    error.status = 404;
    throw error;
  }

  return user;
}