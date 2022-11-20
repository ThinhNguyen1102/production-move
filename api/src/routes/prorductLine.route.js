const router = require("express").Router();

const productLineController = require("../controllers/productLine.controller");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, productLineController.getAllProdLine);

router.get("/:prodLineId", isAuth, productLineController.getProdLine);

router.post("/", isAuth, isAdmin, productLineController.postProdLine);

router.put(
  "/:prodLineId",
  isAuth,
  isAdmin,
  productLineController.putEditProdLine
);

router.delete(
  "/:prodLineId",
  isAuth,
  isAdmin,
  productLineController.deleteProdLine
);

module.exports = router;
