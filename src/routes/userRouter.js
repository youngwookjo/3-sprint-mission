import { Router } from 'express';

const userRouter = Router();

userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);

userRouter.route('/')
  .get(UserController.getUser)
  .patch(UserController.updateUser)

userRouter.patch('/password', UserController.updatePassword);
userRouter.get('/registeredProducts', UserController.getUserProducts);
