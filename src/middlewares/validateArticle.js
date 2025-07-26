import { validate } from 'superstruct';
import { createArticle, patchArticle } from '../structs/articleStructs.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { VALIDATION_ARTICLE_ERRORS } from '../constants/articleConstants.js';

export function validateCreateArticle(req, res, next) {
  const [error] = validate(req.body, createArticle);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_ARTICLE_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}

export function validatePatchArticle(req, res, next) {
  const [error] = validate(req.body, patchArticle);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_ARTICLE_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}