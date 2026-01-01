const db = require("../config/db");


const Product = {
  // CREATE product
  create: (data, callback) => {
    const { name, price, stock, image } = data;

    const sql = `
      INSERT INTO products (name, price, stock, image)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, price, stock, image], callback);
  },

  // GET ALL products
  getAll: (callback) => {
    const sql = "SELECT * FROM products";
    db.query(sql, callback);
  },

  // GET product by ID
  getById: (id, callback) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    supabase.query(sql, [id], callback);
  },

  // UPDATE product
  update: (id, data, callback) => {
    const fields = [];
    const values = [];

    if (data.name) {
      fields.push("name = ?");
      values.push(data.name);
    }

    if (data.price) {
      fields.push("price = ?");
      values.push(data.price);
    }

    if (data.stock) {
      fields.push("stock = ?");
      values.push(data.stock);
    }

    if (data.image) {
      fields.push("image = ?");
      values.push(data.image);
    }

    // jika tidak ada data yang dikirim
    if (fields.length === 0) {
      return callback(new Error("No data to update"));
    }

    const sql = `
    UPDATE products
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

    values.push(id);

    db.query(sql, values, callback);
  },

  deleteById: (id, callback) => {
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [id], callback);
  }
  
};



module.exports = Product;


