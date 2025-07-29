import authService from '../services/authService.js';

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken } = await authService.login(email, password);
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

const tokenRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.auth?.userId;
    const accessToken = await authService.tokenRefresh(userId, refreshToken);
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
}

const changePassword = async (req, res, next) => {
  const userId = req.user?.userId;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  try {
    await authService.changePassword(userId, newPassword, oldPassword);
    const message = "비밀번호가 변경되었습니다"
    return res.json({ message });
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  tokenRefresh,
  changePassword
};