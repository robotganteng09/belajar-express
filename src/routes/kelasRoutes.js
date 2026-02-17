import express from "express";
import { kelasController } from "../controllers/kelasController.js";

const router = express.Router();

router.get("/kelas", kelasController.getAllKelas);

export default router;
