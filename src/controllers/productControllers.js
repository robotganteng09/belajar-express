const Product = require("../models/ProductModel");

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Data wajib diisi" });
  }

  // ambil nama file gambar
  const image = req.file ? req.file.filename : null;

  Product.create(
    { name, price, stock, image },
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Produk berhasil ditambahkan",
        id: result.insertId,
        image,
      });
    }
  );

};
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.deleteById(id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal menghapus data" });
    }
    res.json({ message: "Produk berhasil dihapus" });
  });
};

exports.getProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data" });
    }
    res.json(results);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  // ambil image jika ada
  const image = req.file ? req.file.filename : null;

  // validasi: minimal salah satu ada
  if (!name && !price && !stock && !image) {
    return res.status(400).json({ message: "Data tidak boleh kosong" });
  }

  const updateData = {
    name,
    price,
    stock,
    image,
  };

  Product.update(id, updateData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update data" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil diupdate" });
  });

  
};


