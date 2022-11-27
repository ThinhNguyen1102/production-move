const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const authValidation = require("../middlewares/auth.validation");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

router.post(
  "/register",
  // isAuth,
  // isAdmin,
  authValidation,
  authController.register
);

router.post("/login", authValidation, authController.login);

router.post("/logout", authController.logout);

router.post("/refresh_token", authController.generateAccessToken);

router.post("/change_password", isAuth, authController.changePassword);

module.exports = router;
