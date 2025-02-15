const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const productController = require("../controllers/productControllers");
const { requiresLogin, requiresAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", requiresLogin, requiresAdmin, upload.single("image"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.put("/:id", requiresLogin, requiresAdmin, productController.updateProduct);
router.delete("/:id", requiresLogin, requiresAdmin, productController.softDeleteProduct);

module.exports = router;
