require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const path = require("path"); // ⬅️ TAMBAHKAN INI


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); 

app.use("/api", paymentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


app.use("/api/siswa", require("./routes/siswaRoutes"));



app.listen(PORT, () => {
  console.log(` Server berjalan di http://localhost:${PORT}`);
});
