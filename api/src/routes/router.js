const express = require("express");
const productLineRoute = require("./prorductLine.route");
const productRoute = require("./product.route");
const warehouseRoute = require("./warehouse.route");
const packageRoute = require("./package.route");
const authRoute = require("./auth.router");
const userRoute = require("./user.route");

const appRoute = express();

appRoute.use("/auth", authRoute);

appRoute.use("/users", userRoute);

appRoute.use("/productlines", productLineRoute);

appRoute.use("/products", productRoute);

appRoute.use("/packages", packageRoute);

appRoute.use("/warehouses", warehouseRoute);

module.exports = appRoute;
