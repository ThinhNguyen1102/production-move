const router = require("express").Router();

const packageController = require("../controllers/package.controller");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, isAdmin, packageController.getAllPackage);
router.get("/:prodLineId", isAuth, isAdmin, packageController.getPackageWithPL);
router.get("/own", isAuth, packageController.getPackageWithUnit);
router.get("/own/:prodLineId", isAuth, packageController.getPackageWithPLUnit);
router.delete("/:packageId", isAuth, packageController.deletePackageWithId);

router.post("/move", isAuth, packageController.movePackage);

module.exports = router;
