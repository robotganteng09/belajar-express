require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes); 

app.listen(PORT, () => {
  console.log(` Server berjalan di http://localhost:${PORT}`);
});
