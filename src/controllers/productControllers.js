import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        photo,
      },
    });

    res.json({
      message: "Produk berhasil ditambahkan",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;

    const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: Number(price),
        stock: Number(stock),
        ...(photo !== undefined && { photo }),
      },
    });

    res.json({
      message: "Produk berhasil diupdate",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      message: "Produk berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
