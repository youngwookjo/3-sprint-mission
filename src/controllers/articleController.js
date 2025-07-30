import ArticleService from "../services/articleService.js";
import { checkUser } from "../utils/checkUser.js";
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
    const articleId = req.params.id;
    try {
      const article = await ArticleService.getArticle(articleId);
      res.json(article);
    } catch (error) {
      error.status = 404;
      error.message = ARTICLE_ERROR.GET_ARTICLE_ERROR;
      next(error);
    }
  },

  async createArticle(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
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

  async likeArticle(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const articleId = req.params.id;
    try {
      await ArticleService.likeArticle(userId, articleId);
      res.sendStatus(204);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || '게시글 좋아요 중 오류가 발생했습니다.';
      next(error);
    }
  },

  async unlikeArticle(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const articleId = req.params.id;
    try {
      await ArticleService.unlikeArticle(userId, articleId);
      res.sendStatus(204);
    } catch (error) {
      error.status = 500;
      error.message = '게시글 좋아요 취소 중 오류가 발생했습니다.';
      next(error);
    }
  },

  async getArticleWithLike(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const articleId = req.params.id;
    try {
      const article = await ArticleService.getArticleWithLike(userId, articleId);
      res.json(article);
    } catch (error) {
      error.status = 404;
      error.message = '게시글을 찾을 수 없습니다.';
      next(error);
    }
  }
}

export default ArticleController;