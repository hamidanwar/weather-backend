const City = require("../models/City");

// Add a city
exports.addCity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "City name required" });

    const existing = await City.findOne({ name });
    if (existing) return res.status(400).json({ message: "City already exists" });

    const city = new City({ name });
    await city.save();

    res.status(201).json({ message: "City added successfully", city });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
