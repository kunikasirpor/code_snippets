import express from "express";
import db from "../db.js"; // Make sure db.js uses export default
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const q = "INSERT INTO users (username, password) VALUES (?, ?)";

  try {
    await db.query(q, [username, password]);
    res.json("User registered!");
  } catch (err) {
    res.status(500).json("User may already exist.");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM users WHERE username = ? AND password = ?";

  try {
    const [data] = await db.query(q, [username, password]);

    if (data.length > 0) {
      res.json({ success: true, user: data[0] });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
