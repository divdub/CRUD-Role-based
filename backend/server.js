import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({limit : "10mb"}));
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "frontend/dist")));
 
   // Catch-all route for SPA
   app.get(/.*/, (req, res) => {
     res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
   });
 }

app.listen(PORT,()=>{
   console.log(`Server is started on http://localhost:${PORT}`);
   connectDB();
});
