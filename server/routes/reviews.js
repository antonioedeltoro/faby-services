import { Router } from "express";
import Review from "../models/Review.js";
import authUser from "../middleware/authUser.js";

const router = Router();

/* Helper: prune reviews older than 5 years */
async function pruneOldReviews() {
  const now = new Date();
  const fiveYearsAgo = new Date(
    now.getFullYear() - 5,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );
  try {
    await Review.deleteMany({ createdAt: { $lt: fiveYearsAgo } });
  } catch {
    // swallow errors — pruning is best-effort
  }
}

/* GET /api/reviews/public
   Public: only show five-star reviews, newest first
   Also prune 5+ year old reviews automatically.
*/
router.get("/public", async (_req, res) => {
  try {
    await pruneOldReviews();

    const reviews = await Review.find({ rating: 5 }).sort({ createdAt: -1 });

    return res.json(reviews);
  } catch {
    return res.status(500).json({ message: "Failed to load reviews" });
  }
});

/* GET /api/reviews/mine
   Private: all reviews by the current user (any rating), newest first
*/
router.get("/mine", authUser, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json(reviews);
  } catch {
    return res.status(500).json({ message: "Failed to load your reviews" });
  }
});

/* POST /api/reviews
   Private: create review
   body: { rating (1..5), message, authorDisplayName? }
*/
router.post("/", authUser, async (req, res) => {
  try {
    const { rating, message, authorDisplayName } = req.body || {};
    if (!rating || !message)
      return res.status(400).json({ message: "Missing fields" });

    const doc = await Review.create({
      userId: req.user.id,
      authorEmail: req.user.email,
      authorDisplayName: authorDisplayName
        ? String(authorDisplayName).trim()
        : "",
      rating: Number(rating),
      message: String(message).trim(),
    });

    return res.status(201).json(doc);
  } catch {
    return res.status(500).json({ message: "Failed to create review" });
  }
});

/* PUT /api/reviews/:id
   Private + owner-only: update review
*/
router.put("/:id", authUser, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Not found" });
    if (String(review.userId) !== String(req.user.id))
      return res.status(403).json({ message: "Forbidden" });

    const updates = {};
    if (req.body.rating !== undefined) updates.rating = Number(req.body.rating);
    if (req.body.message !== undefined)
      updates.message = String(req.body.message).trim();
    if (req.body.authorDisplayName !== undefined)
      updates.authorDisplayName = String(req.body.authorDisplayName).trim();

    const updated = await Review.findByIdAndUpdate(id, updates, { new: true });
    return res.json(updated);
  } catch {
    return res.status(500).json({ message: "Failed to update review" });
  }
});

/* DELETE /api/reviews/:id
   Private + owner-only: delete review
*/
router.delete("/:id", authUser, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Not found" });
    if (String(review.userId) !== String(req.user.id))
      return res.status(403).json({ message: "Forbidden" });

    await Review.findByIdAndDelete(id);
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ message: "Failed to delete review" });
  }
});

export default router;
