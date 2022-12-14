const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: {
      type: String,
    },
    tel: [Number],
    email: [String],
    address: {
      city: String,
      street: String,
      houseNumber: String,
    },
  },
  productsList: {
    products: { type: Array, default: [] },
    quantity: { type: Number, default: 1 },
  },
  readyToFulfillment: { type: Boolean, default: false },
  orderComplete: { type: Boolean, default: false },
  timeToDeliver: Date,
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
