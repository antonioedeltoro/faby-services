// server/controllers/newsController.js
import fs from "fs";
import path from "path";
import slugify from "slugify";
import News from "../models/News.js";

/**
 *  GET /api/news
 *  Public – return all news items, newest first.
 */
export const getAllNews = async (req, res) => {
  try {
    const items = await News.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
};

/**
 *  GET /api/news/slug/:slug
 *  Public – fetch a post by its slug.
 */
export const getNewsBySlug = async (req, res) => {
  try {
    const item = await News.findOne({ slug: req.params.slug }).lean();
    if (!item) return res.status(404).json({ message: "News not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news by slug" });
  }
};

/**
 *  GET /api/news/:id
 *  Public – Fetch by Mongo _id (mainly for admin editing forms).
 */
export const getNewsById = async (req, res) => {
  try {
    const item = await News.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ message: "News not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news by ID" });
  }
};

/**
 *  POST /api/news
 *  Protected – Create a new post. Accepts multipart/form‑data with fields:
 *  title, content, (optional) image file
 */
export const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Build the document
    const doc = new News({
      title,
      content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating news" });
  }
};

/**
 *  PUT /api/news/:id
 *  Protected – Update an existing post.
 *  Accepts multipart/form‑data so image can be replaced.
 */
export const updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updates = { title, content };

    // If title changed, regenerate slug here because findByIdAndUpdate
    // does not trigger the pre('save') hook.
    if (title) {
      updates.slug = slugify(title, { lower: true, strict: true });
    }

    // If a new file was uploaded, store its URL and delete the old image.
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;

      // Clean up previous file
      const prev = await News.findById(req.params.id).lean();
      if (prev?.imageUrl) {
        const oldPath = path.join(process.cwd(), prev.imageUrl);
        fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
      }
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "News not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating news" });
  }
};

/**
 *  DELETE /api/news/:id
 *  Protected – Remove a post and its image from disk.
 */
export const deleteNews = async (req, res) => {
  try {
    const removed = await News.findByIdAndDelete(req.params.id).lean();
    if (!removed) return res.status(404).json({ message: "News not found" });

    // Delete image file if it exists
    if (removed.imageUrl) {
      const imgPath = path.join(process.cwd(), removed.imageUrl);
      fs.existsSync(imgPath) && fs.unlinkSync(imgPath);
    }

    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting news" });
  }
};
