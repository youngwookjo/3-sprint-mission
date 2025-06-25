import { Router } from "express";
import CommentController from "../controllers/commentController.js";
import { validateCreateComment, validatePatchComment } from "../middlewares/vaildateComment.js";

export const productCommentRouter = Router();
export const freeCommentRouter = Router();

productCommentRouter.route('/product/:id')
  .get(CommentController.getCommentList)
  .post(validateCreateComment, CommentController.createComment);
productCommentRouter.route('/comment/:id')
  .patch(validatePatchComment, CommentController.patchComment)
  .delete(CommentController.deleteComment);

freeCommentRouter.route('/article/:id')
  .get(CommentController.getCommentList)
  .post(validateCreateComment, CommentController.createComment)
freeCommentRouter.route('/comment/:id')
  .patch(validatePatchComment, CommentController.patchComment)
  .delete(CommentController.deleteComment);




