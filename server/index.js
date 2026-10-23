// server/index.js  (ES-module version)

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

import authRoutes from "./routes/auth.js"; // admin-only (existing)
import newsRoutes from "./routes/news.js"; // existing
import userAuthRoutes from "./routes/userAuth.js"; // ← NEW (user accounts)
import reviewsRoutes from "./routes/reviews.js"; // ← NEW (reviews CRUD)

dotenv.config();

const app = express();

/* CORS */
// Full access: the live site (and local dev / Render URLs).
const allowedOrigins = [
  process.env.CLIENT_ORIGIN || "http://localhost:5173",
  "https://faby-services.onrender.com",
  "https://www.fabyservices.com",
];

// Read-only access: the deltoro.codes portfolio showcase. It may display
// public data (news, reviews) but must never write to the live database.
const readOnlyOrigins = ["https://faby-services.deltoro.codes"];

const fullCors = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const readOnlyCors = {
  origin: true,
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
  credentials: false,
};

// Server-side guard: CORS only stops browsers from reading responses, so
// reject any non-GET request from a read-only origin before it reaches a route.
app.use((req, res, next) => {
  const origin = req.get("Origin");
  if (
    readOnlyOrigins.includes(origin) &&
    !["GET", "HEAD", "OPTIONS"].includes(req.method)
  ) {
    return res.status(403).json({ message: "Read-only demo origin" });
  }
  next();
});

app.use(
  cors((req, callback) => {
    const origin = req.get("Origin");
    if (allowedOrigins.includes(origin)) return callback(null, fullCors);
    if (readOnlyOrigins.includes(origin)) return callback(null, readOnlyCors);
    callback(null, { origin: false });
  })
);

/* Ensure the uploads folder exists (multer writes here) */
fs.mkdirSync("uploads", { recursive: true });

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
