const WaterUsage = require("../models/WaterUsage");

exports.addUsage = async (req, res) => {
  try {
    const newEntry = new WaterUsage(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Water usage recorded!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save usage" });
  }
};

exports.getUsage = async (req, res) => {
  try {
    const usageData = await WaterUsage.find();
    res.json(usageData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch usage data" });
  }
};
