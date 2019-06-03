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

module.exports = MovieRating = mongoose.model("movieRating", MovieSchema);
