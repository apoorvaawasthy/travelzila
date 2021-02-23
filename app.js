const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const Destination = require("./models/destination");
mongoose.connect("mongodb://localhost:27017/travelzila", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get(
  "/destinations",
  catchAsync(async (req, res) => {
    const destinations = await Destination.find({});
    res.render("destinations/index", { destinations });
  })
);
app.post(
  "/destinations",
  catchAsync(async (req, res, next) => {
    const destination = new Destination(req.body.destination);
    await destination.save();
    res.redirect(`/destinations/${destination._id}`);
  })
);
app.get("/destinations/new", (req, res) => {
  res.render("destinations/new");
});
app.get(
  "/destinations/:id",
  catchAsync(async (req, res) => {
    const destination = await Destination.findById(req.params.id);
    res.render("destinations/show", { destination });
  })
);
app.get(
  "/destinations/:id/edit",
  catchAsync(async (req, res) => {
    const destination = await Destination.findById(req.params.id);
    res.render("destinations/edit", { destination });
  })
);
app.put(
  "/destinations/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findByIdAndUpdate(id, {
      ...req.body.destination,
    });
    res.redirect(`/destinations/${destination._id}`);
  })
);
app.delete(
  "/destinations/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    res.redirect("/destinations");
  })
);
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = " Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => {
  console.log("Running on 3000");
});
