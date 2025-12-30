const db = require("../config/db");

const User = {
  create: (data, callback) => {
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, data, callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT id, username, email FROM users";
    db.query(sql, callback);
  },
};

module.exports = User;
