const { DataTypes } = require("sequelize");
const { db } = require("../utils/database");

const User = db.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "available",
  },
});

module.exports = { User };
