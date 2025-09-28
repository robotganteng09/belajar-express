const db = require("../config/db");


exports.addProduct = (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  const sql = "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)";
  db.query(sql, [name, price, stock], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menambahkan produk", error: err });

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      product: { id: result.insertId, name, price, stock },
    });
  });
};


exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil produk", error: err });

    res.json(result);
  });
};
