const generateCode = require("../helpers/generateCode");
const db = require("../models/index.model");

const productController = {
  postProducts: async (req, res, next) => {
    const { productLineId, warehouseId, quantity } = req.body;
    const products = [];
    const package = {
      unit_manage_id: req.userId,
      product_line_id: productLineId,
      quantity: quantity,
    };
    const unsoldStatus = {
      unit_manage_id: req.userId,
      warehouse_id: warehouseId,
      status_code: "STT-01",
    };

    Promise.all([
      db.Package.create(package),
      db.UnSoldStatus.create(unsoldStatus),
    ])
      .then(async (result) => {
        for (let i = 1; i <= quantity; i++) {
          products.push({
            prod_id: generateCode("P"),
            isSold: false,
            unsold_status_id: result[1].id,
            sold_status_id: null,
            package_id: result[0].id,
            product_line_id: productLineId,
          });
        }

        try {
          const productsSaved = await db.Product.bulkCreate(products);
          res.status(201).json({
            message: "ok",
            result: productsSaved,
          });
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  },
};

module.exports = productController;
