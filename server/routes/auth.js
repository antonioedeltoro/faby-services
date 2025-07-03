require("dotenv").config(); // ✅ Load env variables first

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

console.log("✅ Loaded from .env →", ADMIN_EMAIL, ADMIN_PASSWORD);

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("📨 Login attempt:");
  console.log("  Received →", email, password);
  console.log("  Expected →", ADMIN_EMAIL, ADMIN_PASSWORD);

  if (!email || !password) {
    console.error("❗ Missing email or password in request body");
    return res.status(400).json({ message: "Missing credentials" });
  }

  console.log("🔍 Email match?", email === ADMIN_EMAIL);
  console.log("🔍 Password match?", password === ADMIN_PASSWORD);

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, "your_jwt_secret", { expiresIn: "1h" });
    console.log("✅ Login success");
    return res.json({ token });
  } else {
    console.warn("❌ Login failed");
    return res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;
