const db = require("../models/index.model");

const RequestPackageController = {
  createRequest: async (req, res, next) => {
    const unitId = req.userId;
    const { receiverId, productLineId, quantity, description } = req.body;

    try {
      const packageRequest = {
        sender_id: +unitId,
        receiver_id: +receiverId,
        product_line_id: +productLineId,
        quantity: +quantity,
        description: description,
      };

      const packageRequestSaved = await db.PackageRequest.create(
        packageRequest
      );

      res.status(200).json({
        success: true,
        message: "create package request successfully",
        data: {
          packageRequestSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  acceptRequest: async (req, res, next) => {
    const unitId = req.userId;
    const requestId = req.params.packageId;

    try {
      const packageRequest = await db.PackageRequest.findByPk(requestId, {
        where: {
          receiver_id: unitId,
        },
      });

      if (!packageRequest) {
        const err = new Error("Could not find request.");
        err.statusCode = 404;
        throw err;
      }

      packageRequest.isDone = true;
      const packageRequestSaved = await packageRequest.save();

      res.status(200).json({
        success: true,
        message: "create package request successfully",
        data: {
          packageRequestSaved,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  getSendRequestOwn: async (req, res, next) => {
    const unitId = req.userId;
    try {
      const requests = await db.PackageRequest.findAll({
        where: {
          sender_id: unitId,
        },
        include: [
          {
            model: db.User,
            as: "sender_pkRequest",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.User,
            as: "receiver_pkRequest",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.ProductLine,
            as: "productLine_pkRequest",
            attributes: ["id", "model", "color", "ram", "memory", "price"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "get package request successfully",
        data: {
          requests,
        },
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },

  getReceiveRequestOwn: async (req, res, next) => {
    const unitId = req.userId;

    try {
      const requests = await db.PackageRequest.findAll({
        where: {
          receiver_id: unitId,
        },
        include: [
          {
            model: db.User,
            as: "sender_pkRequest",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.User,
            as: "receiver_pkRequest",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.ProductLine,
            as: "productLine_pkRequest",
            attributes: ["id", "model", "color", "ram", "memory", "price"],
          },
        ],
      });

      res.status(200).json({
        success: true,
        message: "get package requested successfully",
        data: {
          requests,
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

module.exports = RequestPackageController;
