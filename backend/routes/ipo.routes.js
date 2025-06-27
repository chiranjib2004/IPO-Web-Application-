const express = require("express");
const router = express.Router();
const ipoController = require("../controllers/ipo.controller");

const multer = require("multer");
const path = require("path");

// Configure file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Updated POST route to handle files
router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "rhp", maxCount: 1 },
    { name: "drhp", maxCount: 1 },
  ]),
  ipoController.createIPO
);

// Other routes
router.get("/", ipoController.getAllIPOs);
router.get("/:id", ipoController.getIPOById);
router.put("/:id", ipoController.updateIPO);
router.delete("/:id", ipoController.deleteIPO);

module.exports = router;
