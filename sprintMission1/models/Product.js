import { ERROR_MESSAGES } from "../constants/appConstants.js";

export class Product {
  constructor({ name = '', description = '', price = 0, tags = '', images = '', favoriteCount = 0 } = {}) {
    this.name = name; // 상품명
    this.description = description; // 상품 설명
    this.price = price; // 판매 가격
    this.tags = tags; // 해시태그 배열
    this.images = images; // 이미지 배열
    this._favoriteCount = favoriteCount; // 찜하기 수
  };

  favorite() {
    this._favoriteCount++; // 찜하기 수 증가
  };

  get name() {
    return this._name;
  };

  set name(name) {
    const trimmedName = name.trim();
    const validPattern = /^[가-힣a-zA-Z0-9.\-()' ]+$/;

    if (trimmedName.length < 1) {
      throw new Error(ERROR_MESSAGES.PRODUCT_NAME_EMPTY);
    }

    if (!validPattern.test(name) || name.length > 30) {
      throw new Error(ERROR_MESSAGES.PRODUCT_NAME_INVALID);
    }

    this._name = name;
  };

  get description() {
    return this._description;
  };

  set description(description) {
    if (typeof description === 'string' || typeof description === 'number') {
      this._description = description === '' ? '상품 설명이 없습니다' : String(description);
    } else {
      throw new Error(ERROR_MESSAGES.PRODUCT_DESCRIPTION_INVALID);
    }
  };

  get price() {
    return this._price;
  };

  set price(price) {
    if (typeof price === 'number' && price >= 0 && price < 1000000000) {
      this._price = price;
    } else {
      throw new Error(ERROR_MESSAGES.PRODUCT_PRICE_INVALID);
    }
  };

  get tags() {
    return this._tags;
  };

  set tags(tags) {
    let tagArray = [];

    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    if (Array.isArray(tags) && tags.every(tag => typeof tag === 'string')) {
      tagArray = tags.map(tag => tag.trim()).filter(tag => !tag); //tag => !tag 
    } else {
      throw new Error(ERROR_MESSAGES.PRODUCT_TAGS_INVALID);
    }

    const resultTag = [];
    for (let tag of tagArray) {
      if (tag.length < 1 || tag.length > 20) {
        throw new Error(ERROR_MESSAGES.PRODUCT_TAGS_LENGTH_INVALID(tag));
      }
      // 해시태그가 #으로 시작하지 않으면 자동으로 추가합니다.
      // startWith tag.startsWith('#') #이있는지 체크
      const tagReplace = tag.startsWith('#') ? tag : `#${tag}`;

      if (!resultTag.includes(tagReplace)) {
        resultTag.push(tag);
      }
    };
    this._tags = resultTag;
  };

  get images() {
    return this._images;
  };

  set images(images) {
    const urlPattern = /^https?:\/\/.+/;

    if (typeof images === 'string') {
      images = [images];
    }

    if (!Array.isArray(images)) {
      throw new Error(ERROR_MESSAGES.PRODUCT_IMAGES_TYPE_INVALID);
    }

    if (!images.every(image => typeof image === 'string' && urlPattern.test(image))) {
      throw new Error(ERROR_MESSAGES.PRODUCT_IMAGES_ARRAY_INVALID);
    }

    this._images = images;
  };

  get favoriteCount() {
    return this._favoriteCount;
  }
};
