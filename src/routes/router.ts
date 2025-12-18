import Router from 'express';
import { createProduct, getProducts, getProductById, editProduct,deleteProduct } from '../controllers/productController';
import { validateProduct } from '../middleware/validation';
const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, editProduct);
router.delete('/:id', deleteProduct);


export default router;