import ArticleService from "../services/articleService.js";
import { ARTICLE_ERROR } from "../constants/articleConstants.js";

const ArticleController = {
  async getArticleList(req, res, next) {
    try {
      const { offset, limit, } = req.query;
      let orderBy = req.query.orderBy;
      orderBy = (orderBy === 'recent') ? { createdAt: 'desc' } : undefined;
      const articles = await ArticleService.getArticleList({
        offset,
        limit,
        orderBy
      });
      res.json(articles);
    } catch (error) {
      error.status = 500;
      error.message = ARTICLE_ERROR.GET_ARTICLELIST_ERROR;
      next(error);
    }
  },

  async getArticle(req, res, next) {
    const { id } = req.params;
    try {
      const article = await ArticleService.getArticle(id);
      res.json(article);
    } catch (error) {
      error.status = 404;
      error.message = ARTICLE_ERROR.GET_ARTICLE_ERROR;
      next(error);
    }
  },

  async createArticle(req, res, next) {
    const userId = req.user?.userId;
    if (!userId) {
      const error = new Error('사용자 ID가 없습니다.');
      error.status = 400;
    }
    const data = { ...req.body, userId };
    try {
      const article = await ArticleService.createArticle(data);
      res.status(201).json(article);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || ARTICLE_ERROR.CREATE_ARTICLE_ERROR;
      next(error);
    }
  },

  async patchArticle(req, res, next) {
    const { id } = req.params;
    try {
      const article = await ArticleService.patchArticle(id, req.body);
      res.json(article);
    } catch (error) {
      error.status = 404;
      error.message = ARTICLE_ERROR.PATCH_ARTICLE_ERROR;
      next(error);
    }
  },

  async deleteArticle(req, res, next) {
    const { id } = req.params;
    try {
      await ArticleService.deleteArticle(id);
      res.sendStatus(204);
    } catch (error) {
      error.status = 404;
      error.message = ARTICLE_ERROR.DELETE_ARTICLE_ERROR;
      next(error);
    }
  },
}

export default ArticleController;