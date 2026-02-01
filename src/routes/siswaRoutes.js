const express = require("express");
const router = express.Router();
const SiswaController = require("../controllers/siswaController");

router.get("/", SiswaController.getAllSiswa);

module.exports = router;
