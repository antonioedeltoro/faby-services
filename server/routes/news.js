const express = require("express");
const router = express.Router();

const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

// Public routes
router.get("/", getAllNews);
router.get("/:id", getNewsById);

// Admin routes
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
