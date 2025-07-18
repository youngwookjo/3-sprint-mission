import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import { validateCreateProduct, validatePatchProduct } from '../middlewares/validateProduct.js';

const productRouter = Router();

productRouter.route('/')
  .get(ProductController.getproductList)
  .post(validateCreateProduct, ProductController.createProduct);

productRouter.route('/:id')
  .get(ProductController.getproduct)
  .patch(validatePatchProduct, ProductController.patchProduct)
  .delete(ProductController.deleteProduct);

export default productRouter;