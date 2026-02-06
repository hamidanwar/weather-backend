const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/weatherdb")
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    process.exit(0);
  })
  .catch(err => {
    console.log("❌ Connection failed:", err.message);
    process.exit(1);
  });
