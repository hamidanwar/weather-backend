const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URI =", process.env.MONGO_URI);

async function test() {
  try {
    console.log("⏳ Trying to connect...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ CONNECTED TO MONGODB");
    process.exit(0);
  } catch (err) {
    console.error("❌ CONNECTION FAILED:");
    console.error(err.message);
    process.exit(1);
  }
}

test();
