const vendorModel = require("../models/vendor.model");
async function createVendorPost(req, res) {
  try {
    const vendor = req.body;
    const vendorData = await vendorModel.create(vendor);

    return res.send({
      status: "success",
      data: vendorData,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function submitVendorReview(req, res) {
  try {
    const { id } = req.params;
    let { deliveryRating, overallVendorRating } = req.body;

    let vendor = await vendorModel.findOne({
      _id: id,
    });

    let { rating, totalReviews } = vendor.overallVendorRating;
    if (rating === undefined) {
      rating = 5;
      totalReviews = 1;
    }
    vendor.overallVendorRating = {
      rating:
        (rating * totalReviews + overallVendorRating) / (totalReviews + 1),
      totalReviews: totalReviews + 1,
    };

    let { rating: r, totalReviews: tr } = vendor.deliveryRating;
    if (r === undefined) {
      r = 5;
      tr = 1;
    }
    vendor.deliveryRating = {
      rating: (r * tr + deliveryRating) / (tr + 1),
      totalReviews: tr + 1,
    };
    let ackData = await vendorModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          deliveryRating: vendor.deliveryRating,
          overallVendorRating: vendor.overallVendorRating,
        },
      }
    );

    if (ackData.acknowledged) {
      return res.send({
        status: "success",
        data: vendor,
      });
    } else {
      return res.send({
        status: "failed",
        data: "rating updation failed",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

module.exports = {
  createVendorPost,
  submitVendorReview,
};
