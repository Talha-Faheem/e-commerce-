const express = require("express");

const router = express.Router();

const review = require("../controllers/reviewController");

router.post(
  "/review",

  review.addReview,
);

module.exports = router;
