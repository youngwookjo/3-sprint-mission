import { Router } from 'express';
import auth from '../middlewares/auth.js';
import ArticleController from '../controllers/articleController.js';
import { validateCreateArticle, validatePatchArticle } from '../middlewares/validateArticle.js';

const articleRouter = Router();

articleRouter.route('/')
  .get(ArticleController.getArticleList)
  .post(validateCreateArticle, auth.verifyAccessToken, ArticleController.createArticle);

articleRouter.route('/:id')
  .get(ArticleController.getArticle)
  .patch(validatePatchArticle, auth.verifyAccessToken, auth.authArticleVerifyAuth, ArticleController.patchArticle)
  .delete(auth.verifyAccessToken, auth.authArticleVerifyAuth, ArticleController.deleteArticle);

articleRouter.route('/:id/like')
  .post(auth.verifyAccessToken, ArticleController.likeArticle)
  .delete(auth.verifyAccessToken, ArticleController.unlikeArticle);

articleRouter.route('/:id/with-like')
  .get(auth.verifyAccessToken, ArticleController.getArticleWithLike);

export default articleRouter;