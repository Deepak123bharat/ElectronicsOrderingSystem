const orderModel = require("../models/order.model");
const vendorModel = require("../models/vendor.model");
async function createOrderPost(req, res) {
  try {
    const order = req.body;
    let today = new Date();
    order.timeToDeliver =
      order.timeToDeliver || today.setDate(today.getDate() + 3);
    // find best vendors for the products available in the order
    let products = [];
    for (var i = 0; i < order.productsList.products.length; i++) {
      let product = await assignVendors(order.productsList.products[i]);
      products.push(product);
    }
    order.productsList.products = [...products];
    order.productsList.quantity = products.length;
    var orderData = await orderModel.create(order);
    return res.send({
      status: "success",
      data: orderData,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function viewOrder(req, res) {
  try {
    const totalOrder = await orderModel.find().count();

    const order = await orderModel.find();

    for (let i = 0; i < totalOrder; i++) {
      let products = order[i].productsList.products;
      for (let j = 0; j < products.length; j++) {
        products[j].vendor = await vendorModel.find({
          _id: products[j].vendor_id,
        });
      }
    }
    return res.send({
      status: "success",
      data: {
        totalOrder,
        order,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function viewOrderById(req, res) {
  try {
    let { id } = req.params;

    const order = await orderModel.find({ _id: id });

    return res.send({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function submitFinalOrder(req, res) {
  try {
    const { id } = req.params;
    const orderData = await orderModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          readyToFulfillment: true,
        },
      }
    );
    if (orderData.acknowledged) {
      let order = await orderModel.findOne({ _id: id });
      return res.send({
        status: "success",
        data: order,
      });
    } else {
      return res.send({
        status: "failed",
        message: "order not found with given id",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function markOrderComplete(req, res) {
  try {
    const { id } = req.params;
    const orderData = await orderModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          orderComplete: true,
        },
      }
    );
    console.log("orderDat", orderData);
    if (orderData.acknowledged) {
      let order = await orderModel.findOne({ _id: id });
      return res.send({
        status: "success",
        data: order,
      });
    } else {
      return res.send({
        status: "failed",
        message: "order not found with given id",
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
}

async function assignVendors(item) {
  // find vendors for product and sort them based on the ovarall rating
  let vendors = await vendorModel
    .find({
      "product.name": {
        $regex: new RegExp(item.name, "i"),
      },
    })
    .sort({ "overallVendorRating.rating": -1 });

  if (vendors.length == 0) {
    throw new Error("No vendor found for product");
  }
  // only one vendor found for product.name
  else if (vendors.length == 1) {
    return { ...item, vendor_id: vendors[0]._id };
  }
  // if overall rating is the same then sort based on delevery rating
  else {
    vendors.sort((a, b) => b.deliveryRating.rating - a.deliveryRating.rating);
    return { ...item, vendor_id: vendors[0]._id };
  }
}

module.exports = {
  createOrderPost,
  viewOrder,
  viewOrderById,
  submitFinalOrder,
  markOrderComplete,
};
