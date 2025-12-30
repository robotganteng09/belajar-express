const User = require("../models/UserModel");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Field wajib diisi" });
  }

  User.create([username, email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      message: "Register berhasil",
      userId: result.insertId,
    });
  });
};

exports.getUsers = (req, res) => {
  User.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    
  }
}
