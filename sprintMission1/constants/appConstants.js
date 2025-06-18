export const API_BASE_URL = 'https://panda-market-api-crud.vercel.app';

export const ERROR_MESSAGES = {
  PRODUCT_NAME_EMPTY: '상품명은 공백만으로 구성될 수 없습니다.',
  PRODUCT_NAME_INVALID: '상품명은 1~30자 사이이며, 일부 특수문자만 허용됩니다.',
  PRODUCT_DESCRIPTION_INVALID: '상품 설명은 문자열 또는 숫자여야 합니다.',
  PRODUCT_PRICE_INVALID: '판매 가격은 숫자여야 하며, 0 이상이어야 합니다.',
  PRODUCT_TAGS_INVALID: '해시태그는 문자열 또는 문자열 배열이어야 합니다.',
  PRODUCT_TAGS_LENGTH_INVALID: (tag) => `해시태그는 1자 이상 20자 이하이어야 합니다: ${tag}`,
  PRODUCT_IMAGES_TYPE_INVALID: '이미지는 문자열 또는 문자열 배열이어야 합니다.',
  PRODUCT_IMAGES_ARRAY_INVALID: '이미지 배열의 모든 요소는 문자열이어야 합니다.',
  PRODUCT_ID_REQUIRED: '상품 ID는 필수 입력값입니다.',
  PRODUCT_REQUIRED_FIELD_MISSING: (field) => `필수 입력값이 누락되었습니다: ${field}`,
  ARTICLE_TITLE_REQUIRED: '제목은 필수 입력값입니다.',
  ARTICLE_CONTENT_INVALID: '내용은 문자열 또는 숫자여야 합니다.',
  ARTICLE_WRITER_INVALID: '작성자는 1~20자 사이의 문자열이어야 합니다.',
  ARTICLE_TITLE_REQUIRED: '게시글 제목은 필수 입력값입니다.',
  ARTICLE_DATA_REQUIRED: '게시글 데이터는 필수 입력값입니다.',
  ARTICLE_ID_DATA_REQUIRED: '게시글 ID 혹은 데이터가 없습니다다.',
};

export const PRODUCT_REQUIRED_FIELDS = ['name', 'description', 'price', 'tags', 'images'];