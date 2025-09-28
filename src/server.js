require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(` Server berjalan di http://localhost:${PORT}`);
});
