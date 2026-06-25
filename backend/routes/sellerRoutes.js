const express = require("express");

const router = express.Router();

const seller = require("../controllers/sellerController");

router.get(
  "/sellerdetail/:sellerId",

  seller.sellerDetail,
);

router.get(
  "/salesperday/:sellerId",

  seller.salesPerDay,
);

router.get(
  "/orderperday/:sellerId",

  seller.orderPerDay,
);

router.get(
  "/seller/orders/:sellerId",

  seller.sellerOrders,
);

router.put(
  "/seller/order/status/:orderId",

  seller.updateOrderStatus,
);

module.exports = router;
