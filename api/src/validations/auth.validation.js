const { body } = require("express-validator");

const authValidation = {
  registerVali: [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password is at least 6 characters long."),
    body("name")
      .trim()
      .custom((value) => {
        if (isHtml(value)) throw new Error("HTML strings input is not allowed");
        else return true;
      }),
    body("address")
      .trim()
      .custom((value) => {
        if (isHtml(value)) throw new Error("HTML strings input is not allowed");
        else return true;
      }),
    body("phone_number")
      .trim()
      .isMobilePhone()
      .withMessage("Please enter valid phone number value"),
    body("phone_number")
      .trim()
      .isNumeric()
      .withMessage("Please enter valid numberic value"),
  ],
  loginVali: [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password is at least 6 characters long."),
  ],
  changePassVali: [
    body("newPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("New Password is at least 6 characters long."),
    body("oldPassword")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Old Password is at least 6 characters long."),
  ],
};

module.exports = authValidation;
