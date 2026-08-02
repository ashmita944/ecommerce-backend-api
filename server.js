// Pure code ko ES Module (import) style me badal diya
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middlewares: JSON data samajhne ke liye aur Frontend port ko allow karne ke liye
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // 👈 2. Naya User Route Connect Ho Gaya!
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("Tijori khul gayi! Server ek dam ready hai... 🚀"))
  .catch((err) => console.log("DB Connection Error: ", err));

// Professional Routes Entry: Saare routes iske raste se jayenge
app.use('/api/products', productRoutes);

// Test Route (Sirf check karne ke liye ki server chal raha hai ya nahi)
app.get("/", (req, res) => {
  res.send("Mubarak ho! E-commerce Backend Server Chal Raha Hai.");
});

// Server Port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ek dam makhhan jaisa chal raha hai on port ${PORT}`);
});