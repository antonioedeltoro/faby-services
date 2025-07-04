// server/routes/auth.js  (ESM version)

import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // load .env once; harmless if index.js already did

const router = Router();

const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(403).json({ message: "Forbidden" });
});

export default router;
