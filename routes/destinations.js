const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Destination = require("../models/destination");
const { isLoggedIn, isAuthor } = require("../middleware");
router.get(
  "/",
  catchAsync(async (req, res) => {
    const destinations = await Destination.find({});
    res.render("destinations/index", { destinations });
  })
);

router.post(
  "/",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const destination = new Destination(req.body.destination);
    destination.author = req.user._id;
    await destination.save();
    req.flash("success", "succesfully added destination!");
    res.redirect(`/destinations/${destination._id}`);
  })
);
router.get("/new", isLoggedIn, (req, res) => {
  res.render("destinations/new");
});
router.get(
  "/:id",

  catchAsync(async (req, res) => {
    const destination = await Destination.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    console.log(destination);
    if (!destination) {
      req.flash("error", "Cannot find the destination!");
      return res.redirect("/destinations");
    }
    res.render("destinations/show", { destination });
  })
);
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const destination = await Destination.findById(req.params.id);
    res.render("destinations/edit", { destination });
  })
);
router.put(
  "/:id",
  isAuthor,
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findByIdAndUpdate(id, {
      ...req.body.destination,
    });
    req.flash("success", "Sucessfully updated destination!");
    res.redirect(`/destinations/${destination._id}`);
  })
);
router.delete(
  "/:id",
  isAuthor,
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    res.redirect("/destinations");
  })
);
module.exports = router;
