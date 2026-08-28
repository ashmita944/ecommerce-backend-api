import Product from '../models/product.js';

// 1. Product Add Karne Ka Logic
export const addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json({ message: "Product saved successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Database se saare Products fetch karne ka logic
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 3. Product Delete karne ka logic
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product nahi mila!" });
        }
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 4. Product Update karne ka logic (Jo server.js se shift hua hai!)
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const newData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product nahi mila!" });
        }
        res.status(200).json({ message: "Product makhhan jaisa update ho gaya! 🔄", updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Update karne me dikkat aayi", error: err.message });
    }
};

// Saare Products fetch karne ka logic
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Products lane me dikkat aayi", error: err.message });
  }
}; 
