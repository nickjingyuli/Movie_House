const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  avgRating: {
    type: Number,
    required: true
  },
  totalVotes: {
    type: Number,
    required: true
  }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
