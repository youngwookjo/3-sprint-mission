import apiClient from '../utils/apiClient.js'; // API 클라이언트 인스턴스
import HE from '../utils/handleError.js'; // 예외 처리 유틸리티
import { ERROR_MESSAGES, PRODUCT_REQUIRED_FIELDS } from "../constants/appConstants.js"; // 상수 정의}

async function getProductList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  try {
    const response = await apiClient.get('/products', {
      params: { page, pageSize, keyword }
    });
    return response.data;
  } catch (error) {
    HE.handleAxiosError(error, 'getProductList');
    throw error;
  }
};

async function getProduct(productId) {
  if (!productId) {
    throw new Error(ERROR_MESSAGES.PRODUCT_ID_REQUIRED);
  }
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    HE.handleAxiosError(error, 'getProduct');
    throw error;
  }
};

async function createProduct(productData = {}) {
  for (const field of PRODUCT_REQUIRED_FIELDS) {
    if (!productData[field]) {
      throw new Error(ERROR_MESSAGES.PRODUCT_REQUIRED_FIELD_MISSING(field));
    }
  }
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    HE.handleAxiosError(error, 'createProduct');
    throw error;
  }
};

async function patchProduct(productId, productData = {}) {
  if (!productId) {
    throw new Error(ERROR_MESSAGES.PRODUCT_ID_REQUIRED);
  }
  try {
    const response = await apiClient.patch(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    HE.handleAxiosError(error, 'patchProduct');
    throw error;
  }
};

async function deleteProduct(productId) {
  if (!productId) {
    throw new Error(ERROR_MESSAGES.PRODUCT_ID_REQUIRED);
  }
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    HE.handleAxiosError(error, 'deleteProduct');
    throw error;
  }
};

const productService = {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
};

export default productService;
