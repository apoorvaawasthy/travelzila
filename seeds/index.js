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
      author: "603683ab7e97f31b58314124",
      location: `${cities[random10].city}, ${cities[random10].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dp0ljo2ka/image/upload/v1614239345/travelzila/r3rqpcpojxqefhxmy0rc.jpg",
          filename: "travelzila/r3rqpcpojxqefhxmy0rc",
        },
        {
          url:
            "https://res.cloudinary.com/dp0ljo2ka/image/upload/v1614239345/travelzila/xw3t4o9cuoyxokqu8ksx.jpg",
          filename: "travelzila/xw3t4o9cuoyxokqu8ksx",
        },
        {
          url:
            "https://res.cloudinary.com/dp0ljo2ka/image/upload/v1614239345/travelzila/vuhlxv3kq9s7iys12xpe.jpg",
          filename: "travelzila/vuhlxv3kq9s7iys12xpe",
        },
      ],
    });
    await destination.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
