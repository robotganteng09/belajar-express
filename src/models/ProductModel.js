// const db = require("../config/db");
// const supabase = require("../config/supabase");

// const Product = {
//   // CREATE product
//   create: (data, callback) => {
//     const { name, price, stock, image } = data;

//     const sql = `
//       INSERT INTO products (name, price, stock, image)
//       VALUES (?, ?, ?, ?)
//     `;

//     db.query(sql, [name, price, stock, image], callback);
//   },

//   // GET ALL products
//   getAll: (callback) => {
//     const sql = "SELECT * FROM products";
//     db.query(sql, callback);
//   },

//   // GET product by ID
//   getById: (id, callback) => {
//     const sql = "SELECT * FROM products WHERE id = ?";
//     supabase.query(sql, [id], callback);
//   },

//   // UPDATE product
//   update: (id, data, callback) => {
//     const fields = [];
//     const values = [];

//     if (data.name) {
//       fields.push("name = ?");
//       values.push(data.name);
//     }

//     if (data.price) {
//       fields.push("price = ?");
//       values.push(data.price);
//     }

//     if (data.stock) {
//       fields.push("stock = ?");
//       values.push(data.stock);
//     }

//     if (data.image) {
//       fields.push("image = ?");
//       values.push(data.image);
//     }

//     // jika tidak ada data yang dikirim
//     if (fields.length === 0) {
//       return callback(new Error("No data to update"));
//     }

//     const sql = `
//     UPDATE products
//     SET ${fields.join(", ")}
//     WHERE id = ?
//   `;

//     values.push(id);

//     db.query(sql, values, callback);
//   },
// };

// module.exports = Product;


const supabase = require("../config/supabase");

const Product = {
  // CREATE
  create: async (data) => {
    return await supabase.from("first_api").insert([data]);
  },

  // GET ALL
  getAll: async () => {
    return await supabase
      .from("first_api")
      .select("*")
      .order("created_at", { ascending: false });
  },

  // GET BY ID
  getById: async (id) => {
    return await supabase.from("first_api").select("*").eq("id", id).single();
  },

  // UPDATE
  update: async (id, data) => {
    return await supabase.from("first_api").update(data).eq("id", id);
  },

  // DELETE
  delete: async (id) => {
    return await supabase.from("first_api").delete().eq("id", id);
  },
};

module.exports = Product;
