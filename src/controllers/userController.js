import userService from '../services/userService.js';

const creteUser = async (req, res, next) => {
  try {
    const user = {
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      image: req.body.image
    }
    const createdUser = await userService.userCreate(user);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
}

const getUser = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    const user = await userService.getUser(userId);
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

const userPatch = async (req, res, next) => {
  const userId = req.user?.userId;
  const data = { nickname: req.body.nickname, image: req.body.image }
  try {
    const updatedUser = await userService.updateUser(userId, data);
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

const getUserRegisteredProducts = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    const products = await userService.getUserRegisteredProducts(userId);
    return res.json(products);
  } catch (error) {
    next(error);
  }
}

const getUserLikedProducts = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    const products = await userService.getUserLikedProducts(userId);
    return res.json(products);
  } catch (error) {
    next(error);
  }
}

export default {
  creteUser,
  getUser,
  userPatch,
  getUserRegisteredProducts,
  getUserLikedProducts
}
