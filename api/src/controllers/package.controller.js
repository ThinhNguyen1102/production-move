const db = require("../models/index.model");

const packageController = {
  getAllPackage: async (req, res, next) => {},
  getPackageWithUnit: async (req, res, next) => {},
  getPackageWithPL: async (req, res, next) => {},
  getPackageWithPLUnit: async (req, res, next) => {
    const unitId = req.userId;
    const productLineId = req.params.prodLineId;

    try {
      const packages = await db.Package.findAll({
        where: {
          unit_manage_id: unitId,
          product_line_id: productLineId,
        },
      });

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          packages,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  deletePackageWithId: async (req, res, next) => {},
  acceptRecievedPackage: async (req, res, next) => {
    const { unitId, packageId, warehouseId, statusCode } = req.body;
    try {
      const warehouse = await db.Warehouse.findByPk(warehouseId);
      if (warehouse.unit_manage_id !== +unitId) {
        const err = new Error("Unit and warehouse are not the same.");
        err.statusCode = 400;
        throw err;
      }
      const package = await db.Package.findByPk(packageId);
      if (!package) {
        const err = new Error("Could not find package.");
        err.statusCode = 404;
        throw err;
      }
      if (package.unit_manage_id !== +req.userId) {
        const err = new Error("package is not owned.");
        err.statusCode = 404;
        throw err;
      }

      package.unit_manage_id = unitId;
      package.warehouse_id = warehouseId;
      package.status_code = statusCode;

      const packageSaved = await package.save();

      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          packageSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  movePackage: async (req, res, next) => {
    const { unitId, packageId, warehouseId, statusCode } = req.body;

    try {
      const warehouse = await db.Warehouse.findByPk(warehouseId);
      if (warehouse.unit_manage_id !== +unitId) {
        const err = new Error("Unit and warehouse are not the same.");
        err.statusCode = 400;
        throw err;
      }
      const package = await db.Package.findByPk(packageId);
      if (!package) {
        const err = new Error("Could not find package.");
        err.statusCode = 404;
        throw err;
      }
      if (package.unit_manage_id !== +req.userId) {
        const err = new Error("package is not owned.");
        err.statusCode = 404;
        throw err;
      }

      const transport = {
        package_id: package.package_id,
        old_STT_code: package.status_code,
        new_STT_code: statusCode,
        old_unit_id: req.userId,
        new_unit_id: +unitId,
        old_WH_id: package.warehouse_id,
        new_WH_id: +warehouseId,
      };

      const transportSaved = await db.PackageTransport.create(transport);
      res.status(201).json({
        message: "Move package success.",
        success: true,
        data: {
          transportSaved,
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

module.exports = packageController;
