import ProductService from "../services/productService.js";
import { PRODUCT_ERROR } from "../constants/productConstants.js";
import { checkUser } from "../utils/checkUser.js";

const ProductController = {
  async getproductList(req, res, next) {
    const { offset, limit, keyword } = req.query;
    let orderBy = req.query.orderBy;
    orderBy = (orderBy === 'recent') ? { createdAt: 'desc' } : undefined;
    try {
      const products = await ProductService.getProductList({
        offset,
        limit,
        orderBy,
        keyword,
      });
      res.json(products);
    } catch (error) {
      error.status = 500;
      error.message = PRODUCT_ERROR.GET_PRODUCTLIST_ERROR;
      next(error);
    }
  },

  async getProduct(req, res, next) {
    const productId = req.params.id;
    try {
      const data = await ProductService.getProduct(productId);
      res.json(data);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || PRODUCT_ERROR.GET_PRODUCT_ERROR;
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const userId = req.user?.userId;
      await checkUser(userId);
      const data = { ...req.body, userId };
      const product = await ProductService.createProduct(data);
      res.status(201).json(product);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || PRODUCT_ERROR.CREATE_PRODUCT_ERROR;
      next(error);
    }
  },

  async patchProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductService.patchProduct(id, req.body);
      res.json(product);
    } catch (error) {
      error.status = 404;
      error.message = PRODUCT_ERROR.PATCH_PRODUCT_ERROR;
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      await ProductService.deleteProduct(id);
      res.sendStatus(204);
    } catch (error) {
      error.status = 404;
      error.message = PRODUCT_ERROR.DELETE_PRODUCT_ERROR;
      next(error);
    }
  },

  async likeProduct(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const productId = req.params.id;
    try {
      await ProductService.likeProduct(userId, productId);
      res.status(200).json({ message: '상품 좋아요 성공'});;
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || '상품 좋아요 중 오류가 발생했습니다.';
      next(error);
    }
  },

  async unlikeProduct(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const productId = req.params.id;
    try {
      await ProductService.unlikeProduct(userId, productId);
      res.sendStatus(204);
    } catch (error) {
      error.status = 500;
      error.message = '상품 좋아요 취소 중 오류가 발생했습니다.';
      next(error);
    }
  },

  async getProductWithLike(req, res, next) {
    const userId = req.user?.userId;
    await checkUser(userId);
    const productId = req.params.id;
    try {
      const data = await ProductService.getProductWithLike(userId, productId);
      res.json(data);
    } catch (error) {
      error.status = error.status || 500;
      error.message = error.message || "상품 조회 중 오류가 발생했습니다";
      next(error);
    }
  }
}

export default ProductController;