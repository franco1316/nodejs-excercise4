const express = require("express");

const {
  repairsPendingById,
  checkValidations,
  protectToken,
  userIsEmployee,
  createRepairValidations,
} = require("../middlewares/repairs");

const {
  getAllRepairs,
  getRepairById,
  addRepair,
  updateRepairById,
  deleteRepairById,
} = require("../controllers/repairs");

const router = express.Router();

router
  .route("/")
  .get(protectToken, userIsEmployee, getAllRepairs)
  .post(createRepairValidations, checkValidations, addRepair);

router
  .route("/:id")
  .get(protectToken, userIsEmployee, repairsPendingById, getRepairById)
  .patch(protectToken, userIsEmployee, repairsPendingById, updateRepairById)
  .delete(protectToken, userIsEmployee, repairsPendingById, deleteRepairById);

module.exports = { repairs: router };
