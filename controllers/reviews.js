const Destination = require("../models/destination");
const Review = require("../models/review");
module.exports.createReview = async (req, res) => {
  const destination = await Destination.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  destination.reviews.push(review);
  await review.save();
  await destination.save();
  res.redirect(`/destinations/${destination._id}`);
};
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Destination.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/destinations/${id}`);
};
