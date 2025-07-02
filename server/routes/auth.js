const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Received:", email, password);
  console.log("✅ Expected:", ADMIN_EMAIL, ADMIN_PASSWORD);

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, "your_jwt_secret", { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;
