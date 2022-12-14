const mongoose = require("mongoose");
require("dotenv").config();

async function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect("mongodb://127.0.0.1:27017/ecos", (err) => {
      if (err) {
        console.log("Error conencting to DB");
        reject(err);
      } else {
        console.log("Successfully connected to DB");
        resolve();
      }
    });
  });
}

module.exports = {
  connectDatabase,
};
