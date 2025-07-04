// server/routes/news.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  getAllNews,
  getNewsBySlug,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

/* ─────────────────────────────────────────────
   Multer configuration
   ───────────────────────────────────────────── */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads"); // folder must exist or be created at startup
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

/* ─────────────────────────────────────────────
   Public routes
   ───────────────────────────────────────────── */
router.get("/", getAllNews); // GET /api/news
router.get("/slug/:slug", getNewsBySlug); // GET /api/news/slug/:slug
router.get("/:id", getNewsById); // GET /api/news/:id

/* ─────────────────────────────────────────────
   Protected routes – require valid JWT
   ───────────────────────────────────────────── */
router.post("/", authMiddleware, upload.single("image"), createNews); // POST /api/news

router.put("/:id", authMiddleware, upload.single("image"), updateNews); // PUT /api/news/:id

router.delete("/:id", authMiddleware, deleteNews); // DELETE /api/news/:id

export default router;
