import { Router } from 'express';
import auth from '../middlewares/auth.js';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.route('/')
  .get(auth.verifyAccessToken, userController.getUser)
  .post(userController.creteUser)
  .patch(auth.verifyAccessToken, userController.userPatch);

userRouter.get('/me/products', auth.verifyAccessToken, userController.getUserRegisteredProducts);
userRouter.get('/me/liked-products', auth.verifyAccessToken, userController.getUserLikedProducts);

export default userRouter;
