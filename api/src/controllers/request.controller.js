const db = require("../models/index.model");

const RequestController = {
  createPackRequest: async (req, res, next) => {
    const unitId = req.userId;
    const { receiverId, productLineId, description } = req.body;

    try {
      const packageRequest = {
        sender_id: +unitId,
        receiver_id: +receiverId,
        product_line_id: +productLineId,
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

  acceptPackRequest: async (req, res, next) => {
    const unitId = req.userId;
    let { requestId, isAccept } = req.body;

    try {
      const packageRequest = await db.PackageRequest.findOne({
        where: {
          id: requestId,
          receiver_id: unitId,
          isDone: false,
        },
      });
      if (!packageRequest) {
        const err = new Error(
          "Could not find request or request not own, request is done."
        );
        err.statusCode = 404;
        throw err;
      }

      packageRequest.isDone = true;
      if (isAccept === "true") {
        packageRequest.isAccept = true;
      }
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

  getSendPackRequestOwn: async (req, res, next) => {
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

  getReceivePackRequestOwn: async (req, res, next) => {
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

  createProdRequest: async (req, res, next) => {},
  acceptProdRequest: async (req, res, next) => {},
  getSendProdRequestOwn: async (req, res, next) => {},
  getReceiveProdRequestOwn: async (req, res, next) => {},
};

module.exports = RequestController;
