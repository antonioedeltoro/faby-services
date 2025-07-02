const express = require("express");
const router = express.Router();
const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.get("/", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

router.get("/:id", async (req, res) => {
  const newsItem = await News.findById(req.params.id);
  res.json(newsItem);
});

// Protected Routes
router.post("/", authMiddleware, async (req, res) => {
  const newNews = new News(req.body);
  const saved = await newNews.save();
  res.status(201).json(saved);
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
