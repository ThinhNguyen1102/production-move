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
  postSoldProduct: async (req, res, next) => {
    const {
      prodId,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
    } = req.body;
    try {
      const product = await db.Product.findByPk(prodId, {
        include: {
          model: db.Package,
          as: "package_product",
          attributes: ["unit_manage_id", "warehouse_id"],
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

      const customer = {
        name: customerName,
        address: customerAddress,
        email: customerEmail,
        phone_number: customerPhone,
        store_id: product.package_product.unit_manage_id,
      };
      const customerSaved = await db.Customer.create(customer);

      const soldStatus = {
        status_code: "STT-03",
        guarantees: 0,
        unit_manage_id: product.package_product.unit_manage_id,
        customer_id: customerSaved.id,
        warehouse_id: product.package_product.warehouse_id,
      };
      const soldStatusSaved = await db.SoldStatus.create(soldStatus);

      product.isSold = true;
      product.sold_status_id = soldStatusSaved.id;

      const productSaved = await product.save();
      res.status(201).json({
        message: "ok",
        success: true,
        soldStatus: soldStatusSaved,
        customer: customerSaved,
        product: productSaved,
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
      const product = await db.Product.findByPk(prodId, {
        include: {
          model: db.SoldStatus,
          as: "soldStatus_product",
          attributes: ["unit_manage_id", "warehouse_id", "customer_id"],
          include: {
            model: db.Customer,
            as: "customer_soldStatus",
            attributes: ["name", "address", "phone_number"],
          },
        },
      });

      res.status(201).json({
        message: "ok",
        success: true,
        result: product,
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
/*
  {
    prod_id:,
    customerName:,
    customerPhone:,
    customerAddress:,
    customerEmail:,
  }
*/
/*
  {
    prod_id:,
    errorDescription:,
  }
*/
