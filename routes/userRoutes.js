const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Create new user (admin only)
router.post("/create", auth, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users (admin only)
router.get("/", auth, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

module.exports = router;
