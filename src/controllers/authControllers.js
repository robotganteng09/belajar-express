const db = require("../config/db");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

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
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Terjadi kesalahan DB" });

    if (result.length === 0) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Password salah" });
    }

    return res.status(200).json({
      message: "Login berhasil",
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
};

exports.getUsers = (req, res) => {
  db.query("SELECT id, username, email FROM users", (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data" });
    res.json(result);
  });
};
