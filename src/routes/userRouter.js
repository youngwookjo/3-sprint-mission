import { Router } from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();


userRouter.post('/register', userController.creteUser);
userRouter.post('/login', userController.userLogin);
userRouter.post('/logout', auth.verifyAccessToken, userController.logoutUser);
userRouter.post('/token/refresh', auth.verifyRefreshToken, userController.userTokenRefresh);

userRouter.route('/')
  .get(auth.verifyAccessToken, userController.tokenGetUser)
  .patch(auth.verifyAccessToken, userController.userPatch);

userRouter.patch('/change-password', auth.verifyAccessToken, userController.userChangePassword);
userRouter.get('/registered-products', auth.verifyAccessToken, userController.getUserRegisteredProducts);
userRouter.get('/liked-products', auth.verifyAccessToken, userController.getUserLikedProducts);
export default userRouter;
