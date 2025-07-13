// server/routes/auth.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

/* -------- POST /api/auth/login -------- */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(403).json({ message: "Forbidden" });
  }

  /* token valid for 15 minutes */
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  return res.json({ token });
});

export default router;
