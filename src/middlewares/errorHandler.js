import { ERROR_MESSAGES } from "../constants/errorConstants.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: ERROR_MESSAGES.FILE_SIZE_ERROR });
  }

  if (err.message === ERROR_MESSAGES.IMAGE_INVAILD_ERROR) {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ message: ERROR_MESSAGES.P2025_ERROR });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ message: ERROR_MESSAGES.P2002_ERROR });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: '유효하지않거나 잘못된 토큰입니다'});
  }

  if (err.status && err.message) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: ERROR_MESSAGES.HTTP_500_ERROR });
}