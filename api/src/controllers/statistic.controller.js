const { Op } = require("sequelize");
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
              // if (val.sold_status_id) {
              numOfSoldProduct++;
              // }
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
  getAgentStatisticProduct: async (req, res, next) => {
    const unitId = req.userId;
    const statisticProduct = [];

    let currYear = new Date(Date.now()).getFullYear();
    let currMonth = new Date(Date.now()).getMonth() + 1;
    if (currMonth === 1) {
      currMonth = 12;
      currYear = currYear - 1;
    }

    try {
      const packages = await db.Package.findAll({
        where: {
          unit_manage_id: +unitId,
        },
      });

      const packageIds = packages.map((val) => {
        return val.package_id;
      });

      const productLines = await db.ProductLine.findAll({
        include: [
          {
            model: db.Product,
            as: "productLine_product",
            include: [
              {
                model: db.SoldStatus,
                as: "soldStatus_product",
              },
            ],
            where: {
              package_id: {
                [Op.in]: packageIds,
              },
            },
          },
        ],
      });

      const transports = await db.PackageTransport.findAll({
        where: {
          new_unit_id: unitId,
          is_shipping: false,
        },
        include: {
          model: db.Package,
          as: "package_pkTransport",
        },
      });

      if (productLines.length === 0) {
      }
      productLines.forEach((item) => {
        let numOfProduct = item.productLine_product.length;
        let numOfSoldProduct = 0;
        let numOfErrorProduct = 0;

        if (item.productLine_product.length > 0) {
          item.productLine_product.forEach((val) => {
            if (val.soldStatus_product) {
              let year = new Date(
                val.soldStatus_product.createdAt
              ).getFullYear();
              let month =
                new Date(val.soldStatus_product.createdAt).getMonth() + 1;
              if (year === currYear && month === currMonth) {
                numOfSoldProduct++;
              }
              if (
                year === currYear &&
                month === currMonth &&
                val.soldStatus_product.guarantees
              ) {
                numOfErrorProduct++;
              }
            }
          });
        } else {
          numOfProduct = 0;
        }

        let numOfRecieveProduct = 0;
        transports.forEach((val) => {
          if (val.package_pkTransport.product_line_id === item.id) {
            let year = new Date(val.updatedAt).getFullYear();
            let month = new Date(val.updatedAt).getMonth() + 1;
            if (year === currYear && month === currMonth) {
              numOfRecieveProduct += val.package_pkTransport.quantity;
            }
          }
        });

        statisticProduct.push({
          id: item.id,
          model: item.model,
          color: item.color,
          ram: item.ram,
          memory: item.memory,
          price: item.price,
          numOfProduct,
          numOfRecieveProduct,
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
