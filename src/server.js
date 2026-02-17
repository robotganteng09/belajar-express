import express from "express";
import siswaRoutes from "./routes/siswaRoutes.js";
import guruRoutes from "./routes/guruRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import kelasRoute from "./routes/kelasRoutes.js"
import productRoute from "./routes/productRoutes.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",siswaRoutes);
app.use("/api", guruRoutes);
app.use("/api",authRoutes)
app.use("/api", kelasRoute)
app.use("/api/products",productRoute)

app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});
