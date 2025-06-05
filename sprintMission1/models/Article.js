import { ERROR_MESSAGES } from "../constants/appConstants.js";

export class Article {
  constructor({ title = '', content = '', writer = '', likeCount = 0, createdAt = null } = {}) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this._likeCount = likeCount;
    this.createdAt = createdAt;
  };

  like() {
    this._likeCount++;
  };

  get title() {
    return this._title;
  };

  set title(title) {
    if (typeof title === 'string' && title.length >= 1 && title.length < 50) {
      this._title = title;
    } else {
      throw new Error(ERROR_MESSAGES.ARTICLE_TITLE_REQUIRED);
    }
  };

  get content() {
    return this._content;
  };

  set content(content) {
    if (typeof content === 'string' || typeof content === 'number') {
      this._content = content === '' ? '내용이 없습니다' : String(content);
    } else {
      throw new Error(ERROR_MESSAGES.ARTICLE_CONTENT_INVALID);
    }
  };

  get writer() {
    return this._writer;
  };

  set writer(writer) {
    if (!writer) {
      this._writer = '';
    } else if (typeof writer === 'string' && writer.length >= 1 && writer.length < 20) {
      this._writer = writer;
    } else {
      throw new Error(ERROR_MESSAGES.ARTICLE_WRITER_INVALID);
    }
  };

  get likeCount() {
    return this._likeCount;
  };

  get createdAt() {
    return this._createdAt;
  };

  set createdAt(date) {
    if (!date) {
      this._createdAt = new Date();
    } else if (typeof date === 'string' || typeof date === 'number') {
      const parsed = new Date(date);
      this._createdAt = isNaN(parsed) ? new Date() : parsed;
    } else {
      this._createdAt = new Date();
    }
  };
};