// server/routes/userAuth.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

function sign(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function normalizeError(err) {
  // Mongo duplicate key error
  if (err?.code === 11000) {
    return { status: 409, message: "El correo ya está registrado." };
  }
  // Validation errors
  if (err?.name === "ValidationError") {
    return {
      status: 400,
      message: "Datos inválidos. Verifique el correo y la contraseña.",
    };
  }
  return { status: 500, message: "Error del servidor." };
}

// POST /api/user/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Faltan el correo o la contraseña." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 6 caracteres." });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "El correo ya está registrado." });
    }

    const user = await User.create({ email, password });
    const token = sign(user);
    return res
      .status(201)
      .json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    const { status, message } = normalizeError(err);
    return res.status(status).json({ message });
  }
});

// POST /api/user/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Faltan el correo o la contraseña." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = sign(user);
    return res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: "Error del servidor." });
  }
});

export default router;
