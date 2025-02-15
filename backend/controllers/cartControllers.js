const Cart = require("../models/cart");

// ----------------- Add Product to Cart -----------------
const addToCart = async (req, res) => {
    const { userId, productId, productName, price, quantity } = req.body;

    try {
        if (!userId || !productId || !productName || !price) {
            return res.status(400).json({ error: "All fields (userId, productId, productName, price) are required" });
        }

        let existingItem = await Cart.findOne({ userId, productId });

        if (existingItem) {
            existingItem.quantity += quantity ?? 1;
            await existingItem.save();
            return res.status(200).json({ message: "Product quantity updated", cart: existingItem });
        }

        const newCartItem = new Cart({
            userId,
            productId,
            productName,
            price,
            quantity: quantity ?? 1,
        });

        await newCartItem.save();
        res.status(201).json({ message: "Product added to cart", cart: newCartItem });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add product to cart" });
    }
};

// ----------------- Get User's Cart Items -----------------
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const cartItems = await Cart.find({ userId });
        res.status(200).json(cartItems);

    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
};

// ----------------- Remove Item from Cart -----------------
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Cart item ID is required" });
        }

        await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: "Item removed from cart" });

    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ error: "Failed to delete cart item" });
    }
};

module.exports = {
    addToCart,
    getCartItems,
    deleteCartItem
};
