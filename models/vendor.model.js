const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  // lets assume we don't have much informatio on product. lets only take name in product,
  product: {
    name: String,
    price: Number,
  },
  deliveryRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    totalReviews: Number,
  },
  overallVendorRating: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    totalReviews: Number,
  },
});

const vendorModel = mongoose.model("vendors", vendorSchema);

module.exports = vendorModel;
