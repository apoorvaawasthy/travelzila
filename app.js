const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/makedestination", async (req, res) => {
  const newDestination = new Destination({
    title: "London",
    description: "One of the best travel locations!",
  });
  await newDestination.save();
  res.send(newDestination);
});

app.listen(3000, () => {
  console.log("Running on 3000");
});
