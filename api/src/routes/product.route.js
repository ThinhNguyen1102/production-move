const productController = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/", isAuth, productController.postProducts);

router.post("/sell", isAuth, productController.postSoldProduct);

router.post("/guarentee", isAuth, productController.postGuarentee);

router.post("/move", isAuth, productController.moveProduct);

router.post("/accept", isAuth, productController.acceptReceiveProduct);

router.get(
  "/productline/:prodLineId",
  isAuth,
  productController.getProductByPl
);

router.get("/sold/own", isAuth, productController.getSoldProductOwn);

module.exports = router;
