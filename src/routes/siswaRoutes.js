import express from "express";
import { SiswaController } from "../controllers/SiswaController.js";

const router = express.Router();

router.get("/siswa", SiswaController.getAllSiswa);

export default router;
