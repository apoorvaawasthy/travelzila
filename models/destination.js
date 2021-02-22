const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const destinationSchema = new Schema({
  title: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Destination", destinationSchema);
