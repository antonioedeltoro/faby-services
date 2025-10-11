// server/middleware/authUser.js  (ESM version)

import jwt from "jsonwebtoken";

export default function authUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Missing auth token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Keep parity with admin middleware: expose decoded on req.user
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
