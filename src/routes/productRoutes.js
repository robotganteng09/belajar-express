const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productControllers");

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getProducts);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", upload.single("image"), productController.updateProduct);

router.put("/:id", upload.single("image"), productController.updateProduct);
module.exports = router;
