import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { totalAmount } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Aapka cart khaali hai!" });
        }

        // Naya order create karo
        const newOrder = new Order({
            userId,
            items: cart.items,
            totalAmount
        });

        await newOrder.save();

        // Order place hone ke baad Cart khali kar do
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: "Order successfully place ho gaya! 🎉", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};