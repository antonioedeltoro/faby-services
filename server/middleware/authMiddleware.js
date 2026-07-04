// server/middleware/authMiddleware.js  (ESM version)

import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Missing auth token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Reject any valid-but-non-admin token (e.g. a reviews user's 7-day token,
    // which is signed with the same JWT_SECRET but has no admin role).
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = decoded; // optional: make user info available downstream
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
