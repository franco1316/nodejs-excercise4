const express = require("express");

const {
  userExist,
  checkValidations,
  createUserValidations,
  protectAccountOwner,
} = require("../middlewares/users");

const {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, addNewUser);

router
  .route("/:id")
  .get(userExist, getUserById)
  .patch(protectAccountOwner, userExist, updateUserById)
  .delete(protectAccountOwner, userExist, deleteUserById);

module.exports = { users: router };
