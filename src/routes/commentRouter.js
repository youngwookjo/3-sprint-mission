import { Router } from "express";
import auth from "../middlewares/auth.js";
import { validateCreateComment, validatePatchComment } from "../middlewares/validateComment.js";
import CommentController from "../controllers/commentController.js";
import CommentService from "../services/commentService.js";

export const productCommentRouter = Router();
export const freeCommentRouter = Router();

productCommentRouter.route('/product/:id')
  .get(CommentController.getCommentList)
  .post(validateCreateComment, auth.verifyAccessToken, CommentController.createComment);
productCommentRouter.route('/comment/:id')
  .patch(validatePatchComment, auth.verifyAccessToken, auth.createVerifyAuth(CommentService.getComment, '댓글'), CommentController.patchComment)
  .delete(auth.verifyAccessToken, auth.createVerifyAuth(CommentService.getComment, '댓글'), CommentController.deleteComment);

freeCommentRouter.route('/article/:id')
  .get(CommentController.getCommentList)
  .post(validateCreateComment, auth.verifyAccessToken, CommentController.createComment)
freeCommentRouter.route('/comment/:id')
  .patch(validatePatchComment, auth.verifyAccessToken, auth.createVerifyAuth(CommentService.getComment, '댓글'), CommentController.patchComment)
  .delete(auth.verifyAccessToken, auth.createVerifyAuth(CommentService.getComment, '댓글'), CommentController.deleteComment);






