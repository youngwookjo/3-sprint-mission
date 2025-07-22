import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import ProductService from '../services/productService.js';
import { validateCreateProduct, validatePatchProduct } from '../middlewares/validateProduct.js';
import auth from '../middlewares/auth.js';

const productRouter = Router();

productRouter.route('/')
  .get(ProductController.getproductList)
  .post(validateCreateProduct, auth.verifyAccessToken, ProductController.createProduct);

productRouter.route('/:id')
  .get(ProductController.getproduct)
  .patch(validatePatchProduct, auth.verifyAccessToken, auth.createVerifyAuth(ProductService.getproduct, '상품'), ProductController.patchProduct)
  .delete(auth.verifyAccessToken, auth.createVerifyAuth(ProductService.getproduct, '상품'), ProductController.deleteProduct);

export default productRouter;