const router = require("express").Router();

const warehouseController = require("../controllers/warehouse.controller");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, isAdmin, warehouseController.getAllWH);

router.get("/:warehouseId", isAuth, warehouseController.getWHwithId);

router.get("/:unitId", isAuth, isAdmin, warehouseController.getAllWHwithUnitId);

router.get("/own", isAuth, warehouseController.getAllOwnWH);

router.post("/", isAuth, warehouseController.postWH);

router.put("/:warehouseId", isAuth, warehouseController.editWH);

router.delete("/:warehouseId", isAuth, warehouseController.deleteWH);

module.exports = router;
