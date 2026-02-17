import express from "express";
import { GuruController } from "../controllers/guruController.js";

const router = express.Router();

router.get("/guru", GuruController.getAllGuru);

export default router;
