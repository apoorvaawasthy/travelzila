const express = require("express");
const router = express.Router({ mergeParams: true });

const Destination = require("../models/destination");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  catchAsync(async (req, res) => {
    const destination = await Destination.findById(req.params.id);
    const review = new Review(req.body.review);
    destination.reviews.push(review);
    await review.save();
    await destination.save();
    res.redirect(`/destinations/${destination._id}`);
  })
);
router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Destination.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/destinations/${id}`);
  })
);
module.exports = router;
