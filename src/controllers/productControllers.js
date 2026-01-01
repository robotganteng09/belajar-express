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


// const supabase = require("../config/supabase");

// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, stock } = req.body;

//     if (!name || !price || !stock) {
//       return res.status(400).json({ message: "Data wajib diisi" });
//     }

//     let imageUrl = null;

//     // upload image ke Supabase Storage
//     if (req.file) {
//       const fileName = `products/${Date.now()}-${req.file.originalname}`;

//       const { error: uploadError } = await supabase.storage
//         .from("product-images")
//         .upload(fileName, req.file.buffer, {
//           contentType: req.file.mimetype,
//         });

//       if (uploadError) throw uploadError;

//       imageUrl = supabase.storage.from("product-images").getPublicUrl(fileName)
//         .data.publicUrl;
//     }

//     const { error } = await supabase
//       .from("first_api")
//       .insert([{ name, price, stock, image: imageUrl }]);

//     if (error) throw error;

//     res.json({ message: "Produk berhasil ditambahkan" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Gagal menambahkan produk" });
//   }
// };

// /* ================= GET ================= */
// exports.getProducts = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("first_api")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) throw error;

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: "Gagal mengambil data" });
//   }
// };

// /* ================= UPDATE ================= */
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, stock } = req.body;

//     let imageUrl = null;

//     if (req.file) {
//       const fileName = `products/${Date.now()}-${req.file.originalname}`;

//       const { error: uploadError } = await supabase.storage
//         .from("product-images")
//         .upload(fileName, req.file.buffer, {
//           contentType: req.file.mimetype,
//         });

//       if (uploadError) throw uploadError;

//       imageUrl = supabase.storage.from("product-images").getPublicUrl(fileName)
//         .data.publicUrl;
//     }

//     // validasi minimal ada satu data
//     if (!name && !price && !stock && !imageUrl) {
//       return res.status(400).json({ message: "Data tidak boleh kosong" });
//     }

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (price) updateData.price = price;
//     if (stock) updateData.stock = stock;
//     if (imageUrl) updateData.image = imageUrl;

//     const { error, count } = await supabase
//       .from("first_api")
//       .update(updateData)
//       .eq("id", id);

//     if (error) throw error;

//     res.json({ message: "Produk berhasil diupdate" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Gagal update data" });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // 1. Ambil data product dulu (untuk dapet image URL)
//     const { data, error: fetchError } = await supabase
//       .from("first_api")
//       .select("image")
//       .eq("id", id)
//       .single();

//     if (fetchError) throw fetchError;

//     if (data?.image) {

//       const filePath = data.image.split(
//         "/storage/v1/object/public/product-images/"
//       )[1];

//       if (filePath) {
//         const { error: removeError } = await supabase.storage
//           .from("product-images")
//           .remove([filePath]);

//         if (removeError) throw removeError;
//       }
//     }

//     // 3. Hapus data dari table
//     const { error: deleteError } = await supabase
//       .from("first_api")
//       .delete()
//       .eq("id", id);

//     if (deleteError) throw deleteError;

//     res.json({ message: "Produk & gambar berhasil dihapus" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };
