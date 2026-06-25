const express = require("express");

const router = express.Router();

const cart = require("../controllers/cartController");

router.get(
  "/cart/:customerId",

  cart.cart,
);

router.post(
  "/cart/add",

  cart.addToCart,
);

router.put(
  "/cart/increase/:id",

  cart.increase,
);

router.put(
  "/cart/decrease/:id",

  cart.decrease,
);

router.delete(
  "/cart/remove/:id",

  cart.remove,
);

router.get(
  "/checkout/:customerId",

  cart.checkout,
);

module.exports = router;
