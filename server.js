import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://equipmasterapp.com",
  "https://admin.equipmasterapp.com",
  "https://equipmasterp001.vercel.app"
];

dotenv.config();

const app = express();
connectDB();

// Middlewares
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido"));
      }
    },
    credentials: true,
  }));
app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server 200`));
