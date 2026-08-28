import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/productcontroller.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.get('/', getAllProducts);


router.post('/add', protect, addProduct);


router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
