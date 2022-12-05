const router = require("express").Router();

const RequestController = require("../controllers/request.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/packages", isAuth, RequestController.createPackRequest);

router.post("/packages/accept", isAuth, RequestController.acceptPackRequest);

router.get("/packages/send", isAuth, RequestController.getSendPackRequestOwn);

router.get(
  "/packages/receive",
  isAuth,
  RequestController.getReceivePackRequestOwn
);

module.exports = router;
