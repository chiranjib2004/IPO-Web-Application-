const config = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.PORT,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ipo = require("./ipo.model.js")(sequelize, DataTypes);

module.exports = db;
