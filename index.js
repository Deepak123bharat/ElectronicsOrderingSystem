require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connectDB");
const orderRouter = require("./routes/order.routes");
const vendorRouter = require("./routes/vendor.routes");

const logger = require("./middlewares/logger");

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/order", orderRouter);
app.use("/api/vendor", vendorRouter);

connectDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
});
