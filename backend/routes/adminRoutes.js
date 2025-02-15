const express = require("express");
const Product = require("../models/Product");
const { requiresLogin, requiresAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", requiresLogin, requiresAdmin, async (req, res) => {
    const { productId, description, price, quantity, image } = req.body;

    try {
        const newProduct = new Product({ productId, description, price, quantity, image });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
});


router.get("/", requiresLogin, requiresAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});



router.delete("/:id", requiresLogin, requiresAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});

module.exports = router;