const productController = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/", isAuth, productController.postProducts);

router.post("/sell", isAuth, productController.postSoldProduct);

router.post("/guarentee", isAuth, productController.postGuarentee);

module.exports = router;
