const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const cityRoutes = require("./routes/cityRoutes");

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cities", cityRoutes);

// MongoDB connection + start server
async function start() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB CONNECTED");

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
