const db = require("../models/index.model");

const RequestController = {
  createRequest: async (req, res, next) => {
    const unitId = req.userId;
    const { receiverId, content } = req.body;

    try {
      const request = {
        sender_id: +unitId,
        receiver_id: +receiverId,
        content: content,
      };

      const requestSaved = await db.Request.create(request);

      res.status(200).json({
        success: true,
        message: "create request successfully",
        data: {
          requestSaved,
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
    let { requestId, isAccept } = req.body;

    try {
      const request = await db.Request.findOne({
        where: {
          id: requestId,
          receiver_id: unitId,
          isDone: false,
        },
      });
      if (!request) {
        const err = new Error(
          "Could not find request or request not own, request is done."
        );
        err.statusCode = 404;
        throw err;
      }

      request.isDone = true;
      if (isAccept === "true") {
        request.isAccept = true;
      }
      const requestSaved = await request.save();

      res.status(200).json({
        success: true,
        message: "accepted.",
        data: {
          requestSaved,
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
      const requests = await db.Request.findAll({
        where: {
          sender_id: unitId,
        },
        include: [
          {
            model: db.User,
            as: "sender_request",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.User,
            as: "receiver_request",
            attributes: ["name", "address", "email"],
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
      const requests = await db.Request.findAll({
        where: {
          receiver_id: unitId,
        },
        include: [
          {
            model: db.User,
            as: "sender_request",
            attributes: ["name", "address", "email"],
          },
          {
            model: db.User,
            as: "receiver_request",
            attributes: ["name", "address", "email"],
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

module.exports = RequestController;
