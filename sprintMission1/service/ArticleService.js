import HE from '../utils/handleError.js';
import { API_BASE_URL as URL, ERROR_MESSAGES } from '../constants/appConstants.js';

// 게시글 목록 조회
const getArticleList = (page = 1, size = 10) =>
  fetch(`${URL}/articles?page=${page}&size=${size}`)
    .then((response) => {
      HE.validateFetchResponse(response, 'getArticleList');
      return response.json();
    }).then((jsonData) => {
      return jsonData;
    }).catch((error) => {
      HE.handleAxiosError(error, 'getArticleList');
      throw error;
    });

// 단일 게시글 조회
const getArticle = (articleId) => {
  if (!articleId) {
    throw new Error(ERROR_MESSAGES.ARTICLE_ID_REQUIRED);
  }

  return fetch(`${URL}/articles/${articleId}`)
    .then((response) => {
      HE.validateFetchResponse(response, 'getArticle');
      return response.json();
    })
    .then((jsonData) => {
      return jsonData;
    })
    .catch((error) => {
      HE.handleAxiosError(error, 'getArticle');
      throw error;
    });
};

//게시글 생성
const createArticle = ({ articleData } = {}) => {
  if (!articleData) {
    throw new Error(ERROR_MESSAGES.ARTICLE_ID_REQUIRED);
  }

  return fetch(`${URL}/articles`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then(response => {
      HE.validateFetchResponse(response, 'createArticle');
      return response.json();
    })
    .then(jsonData => {
      return jsonData;
    })
    .catch(error => {
      HE.handleAxiosError(error, 'createArticle');
      throw error;
    });
};

// 게시글 수정
const patchArticle = (articleId, articleData = {}) => {
  if (!articleId || !articleData) {
    throw new Error(ERROR_MESSAGES.ARTICLE_ID_DATA_REQUIRED);
  }

  return fetch(`${URL}/articles/${articleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  })
    .then(response => {
      HE.validateFetchResponse(response, 'patchArticle');
      return response.json();
    })
    .then(jsonData => {
      return jsonData;
    })
    .catch(error => {
      HE.handleAxiosError(error, 'patchArticle');
      throw error;
    });
};

// 게시글 삭제
const deleteArticle = (articleId) => {
  if (!articleId) {
    throw new Error(ERROR_MESSAGES.ARTICLE_ID_REQUIRED);
  }

  return fetch(`${URL}/articles/${articleId}`, {
    method: 'DELETE',
  })
    .then(response => {
      HE.validateFetchResponse(response, 'deleteArticle');
      return response.json().catch(() => null);
    })
    .then(jsonData => {
      return jsonData;
    })
    .catch(error => {
      HE.handleAxiosError(error, 'deleteArticle');
      throw error;
    });
};

// API 서비스 객체로 묶어서 export
const articleService = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

export default articleService;