const express = require("express");
const cartControllers = require("../controllers/cartControllers.js"); 

const router = express.Router();


router.post("/add-to-cart", cartControllers.addToCart);


router.get("/cart", cartControllers.getCartItems);

router.delete("/cart/:id", cartControllers.deleteCartItem);

module.exports = router; 
    


