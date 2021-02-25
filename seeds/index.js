const mongoose = require("mongoose");
const Destination = require("../models/destination");
const cities = require("./cities");

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
var caption = ["Awesome", "Incredible", "Marvelous", "Fascinating", "Stunning"];
const seedDB = async () => {
  await Destination.deleteMany({}); //deleting everything from the db
  for (let i = 0; i < 1; i++) {
    const destination = new Destination({
      author: "603683ab7e97f31b58314124",
      location: `${cities[i].city}`,
      title: caption[i],
      images: [
        {
          url:
            "https://res.cloudinary.com/dp0ljo2ka/image/upload/v1614266663/travelzila/hpmzndtp9dk1nroykpen.jpg",
          filename: "travelzila/hpmzndtp9dk1nroykpen",
        },
        {
          url:
            "https://res.cloudinary.com/dp0ljo2ka/image/upload/v1614267064/travelzila/vuzbrphpok1bx97ravxw.jpg",
          filename: "travelzila/vuzbrphpok1bx97ravxw",
        },
      ],
    });
    await destination.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
