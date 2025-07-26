import { validate } from 'superstruct';
import { createComment, patchComment } from '../structs/commentStructs.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { VALIDATION_COMMENT_ERRORS } from '../constants/commentConstants.js';

export function validateCreateComment(req, res, next) {
  const [error] = validate(req.body, createComment);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_COMMENT_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}

export function validatePatchComment(req, res, next) {
  const [error] = validate(req.body, patchComment);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_COMMENT_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}