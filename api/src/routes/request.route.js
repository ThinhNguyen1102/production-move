const router = require("express").Router();

const RequestController = require("../controllers/request.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, RequestController.createRequest);

router.post("/accept", isAuth, RequestController.acceptRequest);

router.get("/send", isAuth, RequestController.getSendRequestOwn);

router.get("/receive", isAuth, RequestController.getReceiveRequestOwn);

module.exports = router;
