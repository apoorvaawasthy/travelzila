const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const destinationSchema = new Schema({
  title: String,
  description: String,
  image: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
destinationSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Destination", destinationSchema);
