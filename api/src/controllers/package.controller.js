const db = require("../models/index.model");

const packageController = {
  getAllPackage: async (req, res, next) => {},
  getPackageWithUnit: async (req, res, next) => {},
  getPackageWithPL: async (req, res, next) => {},
  getPackageWithPLUnit: async (req, res, next) => {},
  deletePackageWithId: async (req, res, next) => {},
  movePackage: async (req, res, next) => {
    const { unitId, packageId, warehouseId, statusCode } = req.body;

    try {
      const package = await db.Package.findByPk(packageId);
      if (!package) {
        const err = new Error("Could not find package.");
        err.statusCode = 404;
        throw err;
      }

      package.unit_manage_id = unitId;
      package.warehouse_id = warehouseId;
      package.status_code = statusCode;

      const result = await package.save();

      res.status(201).json({
        message: "Move package success.",
        success: true,
        result: result,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
};

/*
{
  unitId,
  packageId,
  warehouseId,
}
*/

module.exports = packageController;
