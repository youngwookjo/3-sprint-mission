export function setBoardTypeByBaseUrl(baseUrl) {
  const map = {
    '/product-comments': 'productId',
    '/freeBoard-comments': 'articleId',
  };
  return map[baseUrl.trim()];
}

