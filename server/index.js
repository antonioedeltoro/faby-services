// server/index.js  (ES‑module version)
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";

dotenv.config();

const app = express();

/* ───────────────────────────────────────────
   CORS – adjust ORIGIN for production
   ─────────────────────────────────────────── */
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ───────────────────────────────────────────
   Global middleware
   ─────────────────────────────────────────── */
app.use(express.json()); // built‑in body parser
app.use("/uploads", express.static("uploads")); // serve image files

/* ───────────────────────────────────────────
   Routes
   ─────────────────────────────────────────── */
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

/* ───────────────────────────────────────────
   Database + server start
   ─────────────────────────────────────────── */
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀  Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌  Mongo connection error:", err));
