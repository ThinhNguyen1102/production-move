const { body } = require("express-validator");

const pwValidation = [
  body("newPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("New Password is at least 6 characters long."),
  body("oldPassword")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Old Password is at least 6 characters long."),
];

module.exports = pwValidation;
