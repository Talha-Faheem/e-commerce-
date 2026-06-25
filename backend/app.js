const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],

    credentials: true,
  }),
);

app.use(
  "/uploads",

  express.static("uploads"),
);


app.use(
  "/auth",

  authRoutes,
);

app.use(
  "/seller",

  sellerRoutes,
);

app.use(
  "/product",

  productRoutes,
);

app.use(
  "/cart",

  cartRoutes,
);

app.use(
  "/order",

  orderRoutes,
);

app.use(
  "/review",

  reviewRoutes,
);


app.get(
  "/",

  (req, res) => {
    res.json({
      success: true,

      message: "MarketHub API Running",
    });
  },
);

module.exports = app;
