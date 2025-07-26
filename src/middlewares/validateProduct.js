import { validate } from 'superstruct';
import { createProduct, patchProduct } from '../structs/productStructs.js';
import { ERROR_MESSAGES } from '../constants/errorConstants.js';
import { VALIDATION_PRODUCT_ERRORS } from '../constants/productConstants.js';

export function validateCreateProduct(req, res, next) {
  const [error] = validate(req.body, createProduct);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_PRODUCT_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}

export function validatePatchProduct(req, res, next) {
  const [error] = validate(req.body, patchProduct);

  if (error) {
    const field = error.path[0];
    const message = VALIDATION_PRODUCT_ERRORS[field] || ERROR_MESSAGES.INPUT_INVAILD_ERROR;
    return res.status(400).json({ message });
  }
  next();
}