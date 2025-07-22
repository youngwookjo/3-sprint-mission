import ProductService from "../services/productService.js";
import { PRODUCT_ERROR } from "../constants/productConstants.js";

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

  async getproduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductService.getproduct(id);
      res.json(product);
    } catch (error) {
      error.status = 404;
      error.message = PRODUCT_ERROR.GET_PRODUCT_ERROR;
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        const error = new Error('사용자 ID가 없습니다.');
        error.status = 400;
        throw error;
      }
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
}

export default ProductController;