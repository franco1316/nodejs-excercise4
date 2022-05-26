const { Repair } = require("../models/repairs");

const { catchAsync } = require("../utils/catchAsync");

const getAllRepairs = catchAsync(async (req, res) => {
  const allRepairs = await Repair.findAll({
    where: { status: "pending" },
  });

  res.status(200).json({
    allRepairs,
  });
});

const getRepairById = catchAsync(async (req, res) => {
  const { repair } = req;

  const repairPending = await repair.findOne({
    where: {
      status: "pending",
      id,
    },
  });

  res.status(200).json({
    repairPending,
  });
});

const addRepair = catchAsync(async (req, res) => {
  const { date, computerNumber, comments, userId, status } = req.body;

  const newRepair = await Repair.create({
    date,
    computerNumber,
    comments,
    userId,
    status,
  });

  res.status(201).json({
    newRepair,
  });
});

const updateRepairById = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: "completed",
  });

  res.status(200).json({
    status: "success",
  });
});

const deleteRepairById = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: "cancelled",
  });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllRepairs,
  getRepairById,
  addRepair,
  updateRepairById,
  deleteRepairById,
};
