const router = require("express").Router();

const statisticController = require("../controllers/statistic.controller");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

router.get("/admin/unit", isAuth, isAdmin, statisticController.getAllUnitInfo);

router.get(
  "/admin/product",
  isAuth,
  isAdmin,
  statisticController.getAdminStatisticProduct
);

router.get(
  "/agent/product",
  isAuth,
  statisticController.getAgentStatisticProduct
);

module.exports = router;
