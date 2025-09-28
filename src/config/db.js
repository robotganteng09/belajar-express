const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testdb",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi gagal:", err);
  } else {
    console.log("Terhubung ke MySQL");
  }
});

module.exports = db;
