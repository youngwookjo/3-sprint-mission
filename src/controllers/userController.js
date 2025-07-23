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

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.userLogin(email, password);
    const accessToken = userService.createToken(user, 'access');
    const refreshToken = userService.createToken(user, 'refresh');
    await userService.updateUserRefreshToken(user.id, { refreshToken });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
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
    const userId = req.auth?.userId;
    const accessToken = await userService.userTokenRefresh(userId, refreshToken);
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
  const data = { nickname: req.body.nickname, image: req.body.image }
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
  const oldPassword = req.body.oldPassword;
  try {
    const updatedUser = await userService.userChangePassword(userId, newPassword, oldPassword);
    const message = "비밀번호가 변경되었습니다"
    return res.json({updatedUser,message});
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

const logoutUser = async (req, res, next) => {
  const userId = req.user?.userId;
  try {
    await userService.updateUserRefreshToken(userId, { refreshToken: null });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    })
    return res.status(200).json({ message: '로그아웃 되었습니다' });
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
  userLogin,
  userTokenRefresh,
  tokenGetUser,
  userPatch,
  userChangePassword,
  getUserRegisteredProducts,
  logoutUser,
  getUserLikedProducts
}
