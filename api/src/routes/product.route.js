const productController = require("../controllers/product.controller");
const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/", isAuth, productController.postProducts);

module.exports = router;
