import { Router } from 'express';
import { validateUserCreate, validateUserUpdate } from '../middlewares/validateUser.js';
import auth from '../middlewares/auth.js';
import userController from '../controllers/userController.js';


const userRouter = Router();

userRouter.route('/')
  .get(auth.verifyAccessToken, userController.getUser)
  .post(validateUserCreate, userController.creteUser)
  .patch(validateUserUpdate, auth.verifyAccessToken, userController.userPatch);

userRouter.get('/me/products', auth.verifyAccessToken, userController.getUserRegisteredProducts);
userRouter.get('/me/liked-products', auth.verifyAccessToken, userController.getUserLikedProducts);

export default userRouter;
