import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Mubarak ho! E-commerce Backend Server Chal Raha Hai.");
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Database connect ho gaya! Server ready hai... 🚀"))
  .catch((err) => console.log("DB Connection Error: ", err));

// Server Port (Render dynamic port allocation)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ek dam makhhan jaisa chal raha hai on port ${PORT}`);
});
