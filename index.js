
const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "",      
  database: "testdb" 
});


db.connect((err) => {
  if (err) {
    console.error("Koneksi gagal:", err);
  } else {
    console.log("Terhubung ke MySQL");
  }
});


app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  // Cek apakah email sudah ada
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Terjadi kesalahan DB" });

    if (result.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }


    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
      if (err) return res.status(500).json({ message: "Gagal registrasi" });

      return res.status(201).json({
        message: "Registrasi berhasil",
        user: { id: result.insertId, username, email }
      });
    });
  });
});


app.get("/users", (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data" });
    res.json(result);
  });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
