const { User } = require("../models/users");

const { catchAsync } = require("../utils/catchAsync");

const { AppError } = require("../utils/appError");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const addNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role === "client" || role === "employee") {
    return next(new AppError("The role isnt valid"));
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    hashPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    newUser,
  });
});

const updateUserById = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: "success",
  });
});

const deleteUserById = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({
    status: "disable",
  });

  res.status(200).json({
    status: "success",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: "active" },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid credentials", 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

const checkToken = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.sessionUser });
});

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
  login,
  checkToken,
};
