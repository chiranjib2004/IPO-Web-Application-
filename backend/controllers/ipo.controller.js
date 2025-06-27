const db = require("../models");
const IPO = db.ipo;

// Create new IPO
exports.createIPO = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    const newIPO = {
      ...body,
      logoPath: files.logo?.[0]?.path,
      rhpPdfPath: files.rhp?.[0]?.path,
      drhpPdfPath: files.drhp?.[0]?.path,
    };

    const data = await IPO.create(newIPO);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error uploading IPO:", error);
    res.status(500).json({ message: "Failed to create IPO" });
  }
};


// Get all IPOs
exports.getAllIPOs = async (req, res) => {
  try {
    const data = await IPO.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single IPO by ID
exports.getIPOById = async (req, res) => {
  try {
    const data = await IPO.findByPk(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: "IPO not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete IPO by ID
exports.deleteIPO = async (req, res) => {
  try {
    const id = req.params.id;
    await db.ipo.destroy({ where: { id } });
    res.status(200).json({ message: "IPO deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete IPO" });
  }
};



exports.updateIPO = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await IPO.update(req.body, { where: { id } });
    if (updated[0] === 1) {
      res.json({ message: "IPO updated successfully" });
    } else {
      res.status(404).json({ message: "IPO not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating IPO" });
  }
};

module.exports = {
  createIPO: exports.createIPO,
  getAllIPOs: exports.getAllIPOs,
  getIPOById: exports.getIPOById,
  deleteIPO: exports.deleteIPO,
  updateIPO: exports.updateIPO,
};
