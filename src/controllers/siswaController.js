const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SiswaController = {
  getAllSiswa: async (req, res) => {
    try {
      const results = await prisma.siswa.findMany();

      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Gagal ambil data siswa",
        error: err.message,
      });
    }
  },
};

module.exports = SiswaController;
