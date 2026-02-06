const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  temperature: { type: Number, default: 0 }, // weather temperature
  condition: { type: String, default: "" },  // weather condition
  population: { type: Number, default: 0 }
});

module.exports = mongoose.model("City", citySchema);
