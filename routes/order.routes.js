const express = require("express");
const {
  createOrderPost,
  viewOrder,
  submitFinalOrder,
  markOrderComplete,
  viewOrderById,
} = require("../controllers/order.controllers");

const orderRouter = express.Router();

orderRouter.post("/create", createOrderPost);
orderRouter.get("/", viewOrder);
orderRouter.get("/:id", viewOrderById);
orderRouter.patch("/submitfinalorder/:id", submitFinalOrder);
orderRouter.patch("/ordercomplete/:id", markOrderComplete);

module.exports = orderRouter;
