const express = require("express");
const {
  createVendorPost,
  submitVendorReview,
} = require("../controllers/vendor.controllers");

const vendorRouter = express.Router();

vendorRouter.post("/create", createVendorPost);
vendorRouter.patch("/submitvendorreview/:id", submitVendorReview);

module.exports = vendorRouter;
