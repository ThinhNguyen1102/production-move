const { Op } = require("sequelize");
const generateCode = require("../helpers/generateCode");
const db = require("../models/index.model");

const productController = {
  postProducts: async (req, res, next) => {
    const { productLineId, warehouseId, quantity } = req.body;
    const products = [];
    const package = {
      package_id: generateCode("PK"),
      unit_manage_id: req.userId,
      product_line_id: productLineId,
      quantity: quantity,
      quantity_in_stock: quantity,
      warehouse_id: warehouseId,
      status_code: "STT-01",
    };

    db.Package.create(package)
      .then(async (result) => {
        console.log(result);
        for (let i = 1; i <= quantity; i++) {
          products.push({
            prod_id: generateCode("P"),
            isSold: false,
            sold_status_id: null,
            package_id: result.package_id,
            product_line_id: productLineId,
          });
        }

        try {
          const productsSaved = await db.Product.bulkCreate(products);
          res.status(201).json({
            message: "ok",
            data: {
              productsSaved,
            },
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

  postSoldProduct: async (req, res, next) => {
    const unitId = req.userId;
    const {
      prodId,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
      oldCustomerId,
    } = req.body;
    try {
      const product = await db.Product.findByPk(prodId, {
        include: {
          model: db.Package,
          as: "package_product",
        },
      });

      if (!product) {
        const err = new Error("Could not find product.");
        err.statusCode = 404;
        throw err;
      }
      if (product.isSold) {
        const err = new Error("The product is already sold.");
        err.statusCode = 400;
        throw err;
      }
      if (product.package_product.unit_manage_id !== unitId) {
        const err = new Error("The product not in this unit.");
        err.statusCode = 400;
        throw err;
      }

      // update package
      const package = await db.Package.findByPk(product.package_id);
      package.quantity_in_stock -= 1;
      await package.save();
      let customer;

      if (oldCustomerId) {
        customer = await db.Customer.findByPk(oldCustomerId);
      } else {
        const customer = {
          name: customerName,
          address: customerAddress,
          email: customerEmail,
          phone_number: customerPhone,
          store_id: product.package_product.unit_manage_id,
        };
        customer = await db.Customer.create(customer);
      }

      // create status
      const soldStatus = {
        status_code: "STT-03",
        guarantees: 0,
        unit_manage_id: product.package_product.unit_manage_id,
        customer_id: customer.id,
        warehouse_id: product.package_product.warehouse_id,
      };
      const soldStatusSaved = await db.SoldStatus.create(soldStatus);

      product.isSold = true;
      product.sold_status_id = soldStatusSaved.id;

      const productSaved = await product.save();
      res.status(201).json({
        message: "ok",
        success: true,
        data: {
          soldStatus: soldStatusSaved,
          customer: customer,
          product: productSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  postGuarentee: async (req, res, next) => {
    const { prodId, errorDescription } = req.body;
    console.log(req.body);

    try {
      const product = await db.Product.findByPk(prodId);
      const soldStatus = await db.SoldStatus.findByPk(product.sold_status_id);
      const error = {
        error_code: generateCode("ERR"),
        description: errorDescription,
      };
      const errorSaved = await db.Error.create(error);

      soldStatus.status_code = "STT-04";
      soldStatus.guarantees = 1;
      soldStatus.unit_manage_id = req.userId;
      soldStatus.error_id = errorSaved.id;

      const soldStatusSaved = await soldStatus.save();

      res.status(201).json({
        message: "ok",
        success: true,
        data: {
          soldStatusSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  moveProduct: async (req, res, next) => {
    const { unitId, productId, warehouseId, statusCode } = req.body;
    try {
      const warehouse = await db.Warehouse.findByPk(warehouseId);
      if (warehouse.unit_manage_id !== +unitId) {
        const err = new Error("Unit and warehouse are not the same.");
        err.statusCode = 400;
        throw err;
      }
      const product = await db.Product.findByPk(productId);
      const soldStatus = await db.SoldStatus.findByPk(product.sold_status_id);

      if (soldStatus.unit_manage_id !== req.userId) {
        const err = new Error("product is not owned.");
        err.statusCode = 404;
        throw err;
      }

      soldStatus.status_code = statusCode;
      soldStatus.unit_manage_id = unitId;
      soldStatus.warehouse_id = warehouseId;
      const soldStatusSaved = await soldStatus.save();

      res.status(201).json({
        message: "ok",
        success: true,
        data: {
          soldStatusSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  getProductByPl: async (req, res, next) => {
    const unitId = req.userId;
    const productLineId = req.params.prodLineId;

    try {
      const packages = await db.Package.findAll({
        where: {
          unit_manage_id: unitId,
          product_line_id: productLineId,
        },
      });

      const packageCodes = [];
      packages.forEach((val) => {
        packageCodes.push(val.package_id);
      });

      const products = await db.Product.findAll({
        where: {
          package_id: { [Op.in]: packageCodes },
        },
        include: {
          model: db.Package,
          as: "package_product",
          attributes: ["status_code", "warehouse_id"],
        },
      });
      res.status(200).json({
        success: true,
        message: "edit productLine successfully",
        data: {
          products,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  getSoldProductOwn: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const products = await db.Product.findAll({
        where: {
          isSold: true,
          "$soldStatus_product.unit_manage_id$": unitId,
        },
        include: {
          model: db.SoldStatus,
          as: "soldStatus_product",
          include: {
            model: db.Error,
            as: "error_soldStatus",
            attributes: ["description", "error_code"],
          },
        },
      });

      res.status(200).json({
        success: true,
        message: "edit productLine successfully",
        data: {
          products,
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

module.exports = productController;
