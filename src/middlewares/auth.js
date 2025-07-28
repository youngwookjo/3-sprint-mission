import { expressjwt } from 'express-jwt'
import dotenv from 'dotenv';
dotenv.config();

const verifyAccessToken = expressjwt({
  secret: process.env.JWT_ACCESS_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'user',
});

const verifyRefreshToken = expressjwt({
  secret: process.env.JWT_REFRESH_SECRET,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.refreshToken,
});

const createVerifyAuth = (getResource, resourceName) => {
  return async (req, res, next) => {
    const resourceId = req.params.id;
    const userId = req.user?.userId;

    try {
      const resource = await getResource(resourceId);
      if (!resource) {
        const error = new Error(`존재하지 않는 ${resourceName}입니다.`);
        error.status = 404;
        throw error;
      }

      if (resource.userId !== userId) {
        const error = new Error(`${resourceName}을(를) 등록한 유저가 아닙니다`);
        error.status = 403;
        throw error;
      }

      return next();
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || `${resourceName} 권한 확인 중 오류가 발생했습니다.`;
      next(error);
    }
  }
};

export default {
  verifyAccessToken,
  verifyRefreshToken,
  createVerifyAuth
};