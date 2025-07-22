import userService from '../services/userService.js';

const creteUser = async (req, res, next) => {
  try {
    const user = req.body;
    const createdUser = await userService.userCreate(user);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
}

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.userLogin(email, password);
    const accessToken = userService.createToken(user, 'access');
    const refreshToken = userService.createToken(user, 'refresh');

    await userService.updateUser(user.id, { refreshToken });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/token/refresh',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    });
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

const userTokenRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { userId } = req.auth
    const accessToken = await userService.refreshToken(userId, refreshToken);
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

const tokenGetUser = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    const user = await userService.tokenGetUser(userId);
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

const userPatch = async (req, res, next) => {
  const userId = req.user?.userId;
  const data = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, data);
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

const userChangePassword = async (req, res, next) => {
  const userId = req.user?.userId;
  const newPassword = req.body.newPassword;
  try {
    const updatedUser = await userService.userChangePassword(userId, newPassword);
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

export default {
  creteUser,
  userLogin,
  userTokenRefresh,
  tokenGetUser,
  userPatch,
  userChangePassword,
  getUserRegisteredProducts
}
