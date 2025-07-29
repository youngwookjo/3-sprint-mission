import { Router } from 'express';
import auth from '../middlewares/auth.js';
import authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/token-refresh', auth.verifyRefreshToken, authController.tokenRefresh);
authRouter.patch('/change-password', auth.verifyAccessToken, authController.changePassword);

export default authRouter;
