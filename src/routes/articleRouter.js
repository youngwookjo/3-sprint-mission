import { Router } from 'express';
import ArticleController from '../controllers/articleController.js';
import { validateCreateArticle, validatePatchArticle } from '../middlewares/validateArticle.js';

const articleRouter = Router();

articleRouter.route('/')
  .get(ArticleController.getArticleList)
  .post(validateCreateArticle, ArticleController.createArticle);

articleRouter.route('/:id')
  .get(ArticleController.getArticle)
  .patch(validatePatchArticle, ArticleController.patchArticle)
  .delete(ArticleController.deleteArticle);

export default articleRouter;