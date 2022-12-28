const db = require("../models/index.model");

const statisticController = {
  getAllUnitInfo: async (req, res, next) => {
    try {
      const users = await db.User.findAll({
        order: [["role", "desc"]],
        include: [
          {
            model: db.Warehouse,
            as: "user_warehouse",
          },
        ],
        attributes: { exclude: ["password"] },
      });

      const admins = users.filter((val) => val.role === 1);
      const agents = users.filter((val) => val.role === 3);
      const factories = users.filter((val) => val.role === 2);
      const serviceCenters = users.filter((val) => val.role === 4);

      res.status(201).json({
        message: "ok",
        success: true,
        data: {
          unitsByRole: {
            admins,
            factories,
            agents,
            serviceCenters,
          },
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getAdminStatisticProduct: async (req, res, next) => {
    try {
      const productLines = await db.ProductLine.findAll({
        include: [
          {
            model: db.Product,
            as: "productLine_product",
            include: {
              model: db.SoldStatus,
              as: "soldStatus_product",
            },
          },
        ],
      });

      const statisticProduct = [];

      if (productLines.length === 0) {
      }
      productLines.forEach((item) => {
        let numOfProduct = item.productLine_product.length;
        let numOfSoldProduct = 0;
        let numOfErrorProduct = 0;

        if (item.productLine_product.length > 0) {
          item.productLine_product.forEach((val) => {
            if (val.soldStatus_product) {
              if (val.sold_status_id) {
                numOfSoldProduct++;
              }
              if (val.soldStatus_product.guarantees) {
                numOfErrorProduct++;
              }
            }
          });
        } else {
          numOfProduct = 0;
        }
        statisticProduct.push({
          id: item.id,
          model: item.model,
          color: item.color,
          ram: item.ram,
          memory: item.memory,
          price: item.price,
          numOfProduct,
          numOfSoldProduct,
          numOfErrorProduct,
        });
      });

      res.status(201).json({
        message: "ok",
        success: true,
        data: {
          statisticProduct,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

module.exports = statisticController;
