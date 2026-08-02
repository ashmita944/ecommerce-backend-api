import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js'; // Protect (Guard/Chowkidar) middleware import kiya

const router = express.Router();

// Saare products dekhne ka route (Koi bhi dekh sakta hai)
router.get('/', getAllProducts);

// Naya product add karne ka route (Isme 'protect' lag gaya hai, toh ab sirf Logged-in User/Admin hi add kar payega)
router.post('/add', protect, addProduct);

// Update aur Delete ke routes (Aapne pehle import kiye the)
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;