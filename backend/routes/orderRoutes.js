const express = require("express");

const router = express.Router();

const order = require("../controllers/orderController");

router.post(
  "/placeorder",

  order.placeOrder,
);

router.get(
  "/customer/orders/:customerId",

  order.customerOrders,
);

module.exports = router;
