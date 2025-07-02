const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TEMP: Debugging logs
  console.log("Received credentials:", email, password);
  console.log(
    "Expected credentials:",
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD
  );

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ token: "secure-token" });
  }

  return res.status(403).json({ message: "Invalid email or password" });
});

module.exports = router;
