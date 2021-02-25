const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const destinations = require("../controllers/destinations");
const Destination = require("../models/destination");
const { isLoggedIn, isAuthor } = require("../middleware");

router.get("/", catchAsync(destinations.index));

router.post("/", isLoggedIn, catchAsync(destinations.createDestination));
router.get("/new", isLoggedIn, destinations.renderNewForm);
router.get("/:id", catchAsync(destinations.showDestination));
router.get("/:id/edit", isLoggedIn, isAuthor, destinations.renderEditForm);
router.put(
  "/:id",
  isAuthor,
  isLoggedIn,
  catchAsync(destinations.updateDestination)
);
router.delete(
  "/:id",
  isAuthor,
  isLoggedIn,
  catchAsync(destinations.deleteDestination)
);
module.exports = router;
