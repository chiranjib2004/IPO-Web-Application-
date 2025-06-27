require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./models");
const ipoRoutes = require("./routes/ipo.routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Serve static uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/ipo", ipoRoutes);

// Database sync + start server
db.sequelize.sync()
  .then(() => {
    console.log(" DB synced successfully");
    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB connection failed:", err);
  });
