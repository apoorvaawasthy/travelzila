const mongoose = require("mongoose");
const Destination = require("../models/destination");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
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
const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Destination.deleteMany({}); //deleting everything from the db
  for (let i = 0; i < 10; i++) {
    const random10 = Math.floor(Math.random() * 10);
    const destination = new Destination({
      location: `${cities[random10].city}, ${cities[random10].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await destination.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
