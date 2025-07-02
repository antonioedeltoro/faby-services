const router = require("express").Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Received:", email, password);
  console.log(
    "✅ Expected:",
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD
  );

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ token: "fake-jwt-token" });
  } else {
    return res.status(403).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
