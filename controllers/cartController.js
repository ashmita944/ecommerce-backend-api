import Cart from '../models/cartModel.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity: quantity || 1 }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += (quantity || 1);
            } else {
                cart.items.push({ productId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product cart mein add ho gaya!", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        res.status(200).json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};