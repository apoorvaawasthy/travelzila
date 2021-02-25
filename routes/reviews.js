const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const Destination = require("../models/destination");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");

router.post("/", isLoggedIn, catchAsync(reviews.createReview));
router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  catchAsync(reviews.deleteReview)
);
module.exports = router;
