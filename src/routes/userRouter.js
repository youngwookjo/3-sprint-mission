import { Router } from 'express';
import userController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = Router();

userRouter.route('/')
  .get(auth.verifyAccessToken, userController.getUser)
  .post(userController.creteUser)
  .patch(auth.verifyAccessToken, userController.userPatch);

userRouter.get('/me/products', auth.verifyAccessToken, userController.getUserRegisteredProducts);
userRouter.get('/me/liked-products', auth.verifyAccessToken, userController.getUserLikedProducts);

export default userRouter;
