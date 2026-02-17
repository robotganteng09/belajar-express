import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/", upload.single("photo"), createProduct);
router.get("/", getProduct);
router.put("/:id", upload.single("photo"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
