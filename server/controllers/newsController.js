const News = require("../models/News");

// GET /api/news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news" });
  }
};

// GET /api/news/:id
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news by ID" });
  }
};

// POST /api/news
const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    const saved = await news.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating news" });
  }
};

// PUT /api/news/:id
const updateNews = async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "News not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating news" });
  }
};

// DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting news" });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
