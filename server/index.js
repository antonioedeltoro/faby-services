// server/index.js  (ES-module version)

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js"; // admin-only (existing)
import newsRoutes from "./routes/news.js"; // existing
import userAuthRoutes from "./routes/userAuth.js"; // ← NEW (user accounts)
import reviewsRoutes from "./routes/reviews.js"; // ← NEW (reviews CRUD)

dotenv.config();

const app = express();

/* CORS */
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:5173",
  "https://faby-services.onrender.com",
  "https://www.fabyservices.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* Middleware */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* Routes */
app.use("/api/auth", authRoutes); // admin login (existing)
app.use("/api/news", newsRoutes); // existing
app.use("/api/user/auth", userAuthRoutes); // ← NEW user register/login
app.use("/api/reviews", reviewsRoutes); // ← NEW reviews API

/* Health + root */
app.get("/api/healthz", (_req, res) =>
  res.json({ status: "ok", ts: Date.now() })
);
app.get("/", (_req, res) => res.send("Faby-Services API is running"));

/* DB + start */
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("✅  MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Mongo connection error:", err));
