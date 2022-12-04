const db = require("../models/index.model");

const TransportController = {
  getSendProdTran: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const transports = await db.ProductTransport.findAll({
        where: {
          old_unit_id: unitId,
        },
        include: [
          {
            model: db.Product,
            as: "product_pTransport",
            attributes: ["prod_id"],
            include: {
              model: db.ProductLine,
              as: "productLine_product",
            },
          },
          {
            model: db.User,
            as: "oldUnit_pTransport",
          },
          {
            model: db.User,
            as: "newUnit_pTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pTransport",
          },
          {
            model: db.SoldStatus,
            as: "soldStatus_pTransport",
          },
        ],
      });

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          transports,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getRecieveProdTran: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const transports = await db.ProductTransport.findAll({
        where: {
          new_unit_id: unitId,
        },
        include: [
          {
            model: db.Product,
            as: "product_pTransport",
            attributes: ["prod_id"],
            include: {
              model: db.ProductLine,
              as: "productLine_product",
            },
          },
          {
            model: db.User,
            as: "oldUnit_pTransport",
          },
          {
            model: db.User,
            as: "newUnit_pTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pTransport",
          },
          {
            model: db.SoldStatus,
            as: "soldStatus_pTransport",
          },
        ],
      });

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          transports,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getSendPackageTran: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const transports = await db.PackageTransport.findAll({
        where: {
          old_unit_id: unitId,
        },
        include: [
          {
            model: db.Package,
            as: "package_pkTransport",
            include: {
              model: db.ProductLine,
              as: "productLine_package",
            },
          },
          {
            model: db.User,
            as: "oldUnit_pkTransport",
          },
          {
            model: db.User,
            as: "newUnit_pkTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pkTransport",
          },
          {
            model: db.Warehouse,
            as: "newWH_pkTransport",
          },
        ],
      });

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          transports,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getRecievePackageTran: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const transports = await db.PackageTransport.findAll({
        where: {
          new_unit_id: unitId,
        },
        include: [
          {
            model: db.Package,
            as: "package_pkTransport",
            include: {
              model: db.ProductLine,
              as: "productLine_package",
            },
          },
          {
            model: db.User,
            as: "oldUnit_pkTransport",
          },
          {
            model: db.User,
            as: "newUnit_pkTransport",
          },
          {
            model: db.Warehouse,
            as: "oldWH_pkTransport",
          },
          {
            model: db.Warehouse,
            as: "newWH_pkTransport",
          },
        ],
      });

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          transports,
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

module.exports = TransportController;
