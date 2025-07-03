const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");

const app = express();

// 🔥 Apply CORS middleware BEFORE anything else
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Built-in body parser
app.use(express.json());

// ✅ Serve static image files
app.use("/uploads", express.static("uploads"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5001, () => console.log("Server running..."));
  })
  .catch((err) => console.error("Connection error:", err));
