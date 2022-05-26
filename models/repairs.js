const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const Repair = db.define("data", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },

  date: {
    type: DataTypes.DATE,
  },

  computerNumber: {
    type: DataTypes.INTEGER,
    unique: true,
  },

  comments: {
    type: DataTypes.STRING,
  },

  userId: {
    type: DataTypes.INTEGER,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = { Repair };
