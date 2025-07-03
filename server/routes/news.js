const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");

// ─────────────────────────────────────────────
// Multer Configuration for Image Uploads
// ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ─────────────────────────────────────────────
// Public Routes
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

router.get("/:id", async (req, res) => {
  const newsItem = await News.findById(req.params.id);
  res.json(newsItem);
});

// ─────────────────────────────────────────────
// Protected Routes (Create, Update, Delete)
// ─────────────────────────────────────────────
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, body } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newNews = new News({ title, body, image });
    const saved = await newNews.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
