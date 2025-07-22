import { Router } from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();

userRouter.post('/register', userController.creteUser);
userRouter.post('/login', userController.userLogin);
userRouter.post('/token/refresh', userController.userTokenRefresh);

userRouter.route('/')
  .get(auth.verifyAccessToken, userController.tokenGetUser)
  .patch(auth.verifyAccessToken, userController.userPatch);

userRouter.post('/change-password', auth.verifyAccessToken, userController.userChangePassword);
userRouter.get('/user/registered-products', auth.verifyAccessToken, userController.getUserRegisteredProducts);
