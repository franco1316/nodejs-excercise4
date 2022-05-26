const { body, validationRusult } = require("express-validator");

const createUserValidation = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const checkValidations = (req, res, next) => {
  const errors = validationRusult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join(". ");
    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = { createUserValidation, checkValidations };
