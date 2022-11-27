const router = require("express").Router();

const RequestPackageController = require("../controllers/requestPk.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, RequestPackageController.createRequest);

router.get(
  "/accept/:requestId",
  isAuth,
  RequestPackageController.acceptRequest
);

router.get("/send", isAuth, RequestPackageController.getSendRequestOwn);

router.get("/receive", isAuth, RequestPackageController.getReceiveRequestOwn);

module.exports = router;
