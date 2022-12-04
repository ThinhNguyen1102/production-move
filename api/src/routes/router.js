const express = require("express");
const productLineRoute = require("./prorductLine.route");
const productRoute = require("./product.route");
const warehouseRoute = require("./warehouse.route");
const packageRoute = require("./package.route");
const authRoute = require("./auth.router");
const userRoute = require("./user.route");
const packageRequestRoute = require("./packageReq.route");
const productRequestRoute = require("./productReq.route");
const transportRoute = require("./transport.route");

const appRoute = express();

appRoute.use("/auth", authRoute);

appRoute.use("/users", userRoute);

appRoute.use("/productlines", productLineRoute);

appRoute.use("/products", productRoute);

appRoute.use("/packages", packageRoute);

appRoute.use("/warehouses", warehouseRoute);

appRoute.use("/requests/package", packageRequestRoute);

appRoute.use("/requests/product", productRequestRoute);

appRoute.use("/transports", transportRoute);

module.exports = appRoute;
