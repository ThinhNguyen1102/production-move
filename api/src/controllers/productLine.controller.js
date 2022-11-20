const db = require("../models/index.model");
const { validationResult } = require("express-validator/check");

const productLineController = {
  getProdLine: async (req, res, next) => {
    const prodLineId = req.params.prodLineId;
    try {
      const productLine = await db.ProductLine.findByPk(prodLineId);
      if (!productLine) {
        const err = new Error("Could not find product line.");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        success: true,
        message: "get product line successfully",
        result: productLine,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  postProdLine: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const productLine = {
      user_id: req.userId,
      ...req.body,
    };

    try {
      const productLineSaved = await db.ProductLine.create(productLine);
      res.status(200).json({
        success: true,
        message: "create new productLine successfully",
        reault: {
          newProductLine: productLineSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  getAllProdLine: async (req, res, next) => {
    try {
      const productLines = await db.ProductLine.findAll();

      res.status(200).json({
        message: "get all productLine successfully",
        success: true,
        result: productLines,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  putEditProdLine: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation failed, entered data is incorrect.");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const prodLineId = req.params.prodLineId;
    const updateData = req.body;

    try {
      const productLine = await db.ProductLine.findByPk(prodLineId);
      if (!productLine) {
        const err = new Error("Could not find product line.");
        err.statusCode = 404;
        throw err;
      }

      const result = await db.ProductLine.update(updateData, {
        where: {
          id: prodLineId,
        },
      });
      res.status(200).json({
        success: true,
        message: "edit productLine successfully",
        result: result,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  deleteProdLine: async (req, res, next) => {
    const prodLineId = req.params.prodLineId;
    try {
      const productLine = await db.ProductLine.findByPk(prodLineId);

      if (!productLine) {
        const err = new Error("Could not find restaurant.");
        err.statusCode = 404;
        throw err;
      }

      const result = await db.ProductLine.destroy({
        where: {
          id: prodLineId,
        },
      });

      res.status(200).json({
        success: true,
        message: "delete productLine successfully",
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

module.exports = productLineController;
