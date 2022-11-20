const express = require("express");
const productLineRoute = require("./prorductLine.route");
const productRoute = require("./product.route");
const warehouseRoute = require("./warehouse.route");
const authRoute = require("./auth.router");

const appRoute = express();

appRoute.use("/auth", authRoute);

appRoute.use("/productlines", productLineRoute);

appRoute.use("/products", productRoute);

appRoute.use("/warehouses", warehouseRoute);

module.exports = appRoute;
