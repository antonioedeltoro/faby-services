// server/routes/auth.js
const express = require("express");
const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ token: "secure-token" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
