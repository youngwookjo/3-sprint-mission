import CommentService from "../services/commentService.js";
import { setBoardTypeByBaseUrl } from "../utils/boardTypeSet.js";
import { COMMENT_ERROR } from "../constants/commentConstants.js";

const CommentController = {
  async getCommentList(req, res, next) {
    const id = { [setBoardTypeByBaseUrl(req.baseUrl)]: req.params.id };
    const { cursor, limit } = req.query;

    try {
      const comments = await CommentService.getCommentList(id, {
        cursor,
        limit,
      });
      res.json(comments);
    } catch (error) {
      error.status = 500;
      error.message = COMMENT_ERROR.GET_COMMENTLIST_ERROR;
      next(error);
    }
  },

  async createComment(req, res, next) {
    const userId = req.user?.userId;
    if (!userId) {
      const error = new Error('사용자 ID가 없습니다.');
      error.status = 400;
      return next(error);
    }
    const data = { ...req.body, userId };
    const id = { [setBoardTypeByBaseUrl(req.baseUrl)]: req.params.id };
    try {
      const comment = await CommentService.createComment(id, data);
      res.status(201).json(comment);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || COMMENT_ERROR.CREATE_COMMENT_ERROR;
      next(error);
    }
  },

  async patchComment(req, res, next) {
    const { id } = req.params;
    try {
      const comment = await CommentService.patchComment(id, req.body);
      res.json(comment);
    } catch (error) {
      error.status = 404;
      error.message = COMMENT_ERROR.PATCH_COMMENT_ERROR;
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    const { id } = req.params;
    try {
      await CommentService.deleteComment(id);
      res.sendStatus(204);
    } catch (error) {
      error.status = 404;
      error.message = COMMENT_ERROR.DELETE_COMMENT_ERROR;
      next(error);
    }
  }
}

export default CommentController;