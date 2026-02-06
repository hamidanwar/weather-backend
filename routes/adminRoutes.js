const express = require("express");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Admin registration 
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password required" });

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin)
      return res.status(409).json({ message: "Admin already exists" });

    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/dashboard", auth, (req, res) => {
  res.json({ message: `Welcome ${req.admin.username} to the admin dashboard!` });
});

module.exports = router;
