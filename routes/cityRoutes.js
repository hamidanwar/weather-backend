const express = require("express");
const City = require("../models/City");
const auth = require("../middleware/auth");

const router = express.Router();

console.log("cityRoutes.js loaded");

// ---------------- POST: Add a new city ----------------
router.post("/", auth, async (req, res) => {
  try {
    const { name, country, temperature, condition, population } = req.body;

    if (!name || !country) {
      return res.status(400).json({ message: "Name and country are required" });
    }

    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(409).json({ message: "City already exists" });
    }

    const newCity = new City({ name, country, temperature, condition, population });
    await newCity.save();

    res.status(201).json(newCity);
  } catch (err) {
    console.error("POST ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ---------------- GET: All cities ----------------
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    console.error("GET ALL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ---------------- GET: Single city by name ----------------
router.get("/:name", async (req, res) => {
  try {
    const city = await City.findOne({ name: req.params.name });
    if (!city) return res.status(404).json({ message: "City not found" });
    res.status(200).json(city);
  } catch (err) {
    console.error("GET ONE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ---------------- PUT: Update a city ----------------
router.put("/:name", auth, async (req, res) => {
  try {
    const city = await City.findOne({ name: req.params.name });
    if (!city) return res.status(404).json({ message: "City not found" });

    const { name: newName, country, temperature, condition, population } = req.body;

    if (newName) city.name = newName;
    if (country) city.country = country;
    if (temperature !== undefined) city.temperature = temperature;
    if (condition) city.condition = condition;
    if (population !== undefined) city.population = population;

    await city.save();
    res.status(200).json(city);
  } catch (err) {
    console.error("PUT ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ---------------- DELETE: Remove a city ----------------
router.delete("/:name", auth, async (req, res) => {
  try {
    // Case-insensitive search
    const city = await City.findOneAndDelete({ name: new RegExp(`^${req.params.name}$`, "i") });

    if (!city) return res.status(404).json({ message: "City not found" });

    res.status(200).json({ message: "City deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
