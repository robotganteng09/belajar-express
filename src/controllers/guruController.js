import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GuruController = {
  getAllGuru: async (req, res) => {
    try {
      const results = await prisma.guru.findMany();
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Gagal ambil data guru",
        error: err.message,
      });
    }
  },
};
