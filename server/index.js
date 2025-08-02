// server/index.js  (ES‑module version)

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";

/* ───────────────────────────────────────────
   Load environment variables
   ─────────────────────────────────────────── */
dotenv.config();

const app = express();

/* ───────────────────────────────────────────
   CORS configuration
   ─────────────────────────────────────────── */
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:5173", // local dev
  "https://faby-services.onrender.com", // Render static preview
  "https://www.fabyservices.com", // Production domain
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ───────────────────────────────────────────
   Global middleware
   ─────────────────────────────────────────── */
app.use(express.json()); // built‑in body parser
app.use("/uploads", express.static("uploads")); // serve uploaded images

/* ───────────────────────────────────────────
   Application routes
   ─────────────────────────────────────────── */
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

/* ───────────────────────────────────────────
   Health & root routes
   ─────────────────────────────────────────── */
app.get("/api/healthz", (_req, res) =>
  res.json({ status: "ok", ts: Date.now() })
);

app.get("/", (_req, res) => res.send("Faby‑Services API is running 🎉"));

/* ───────────────────────────────────────────
   Database connection + server start
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
