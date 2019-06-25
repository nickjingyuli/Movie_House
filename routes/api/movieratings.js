const express = require("express");
const router = express.Router();
const MovieRating = require("../../models/MovieRating");

// @route    GET api/movie-rating/:movieid
// @desc     Get average rating of a movie
// @access   Public

router.get("/:movieid", async (req, res) => {
  try {
    const movie = await MovieRating.findOne({ movieId: req.params.movieid });
    if (!movie) {
      return res.status(400).json({ msg: "Movie MovieDetailRating not found" });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
