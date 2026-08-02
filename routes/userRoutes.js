import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// 1. Signup Route (http://localhost:5000/api/users/register)
router.post('/register', registerUser);

// 2. Login Route (http://localhost:5000/api/users/login)
router.post('/login', loginUser);

export default router;