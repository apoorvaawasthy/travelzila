const Destination = require("../models/destination");

module.exports.index = async (req, res) => {
  const destinations = await Destination.find({});
  res.render("destinations/index", { destinations });
};

module.exports.createDestination = async (req, res, next) => {
  const destination = new Destination(req.body.destination);
  destination.author = req.user._id;
  await destination.save();
  req.flash("success", "succesfully added destination!");
  res.redirect(`/destinations/${destination._id}`);
};
module.exports.renderNewForm = (req, res) => {
  res.render("destinations/new");
};
module.exports.showDestination = async (req, res) => {
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
};
module.exports.renderEditForm = async (req, res) => {
  const destination = await Destination.findById(req.params.id);
  if (!destination) {
    req.flash("error", "Cannot find the destination!");
    return res.redirect("/destinations");
  }
  res.render("destinations/edit", { destination });
};

module.exports.updateDestination = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findByIdAndUpdate(id, {
    ...req.body.destination,
  });
  req.flash("success", "Sucessfully updated destination!");
  res.redirect(`/destinations/${destination._id}`);
};
module.exports.deleteDestination = async (req, res) => {
  const { id } = req.params;
  await Destination.findByIdAndDelete(id);
  res.redirect("/destinations");
};
