import express from "express";
import { login,register,getUsers } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
// router.get("/products",)

export default router
