const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Movie = require("../../models/Movie");

// @route    POST api/comments
// @desc     Create or update a comment about a movie
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("movieId", "MovieID is required")
        .not()
        .isEmpty(),
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { movieId, text, movieRating } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");
      // Build comment object
      const commentFields = {};
      commentFields.username = user.username;
      commentFields.user = req.user.id;
      commentFields.movieId = movieId;
      commentFields.text = text;
      if (movieRating) {
        commentFields.movieRating = movieRating;
      }

      let comment = await Comment.findOne({
        user: req.user.id,
        movieId: req.body.movieId
      });
      let prevMovieRating;
      if (comment) {
        comment.movieRating && (prevMovieRating = comment.movieRating);
        comment = await Comment.findOneAndUpdate(
          {
            user: req.user.id,
            movieId: movieId
          },
          { $set: commentFields },
          { new: true }
        );
      } else {
        comment = new Comment(commentFields);
        await comment.save();
      }
      // Update average rating of the movie
      let movie = await Movie.findOne({ movieId: movieId });
      if (!movie && movieRating) {
        movie = new Movie({
          movieId: movieId,
          avgRating: movieRating,
          totalVotes: 1
        });
        await movie.save();
        return res.json(comment);
      }
      if (movie && movieRating) {
        let prevTotal = movie.totalVotes;
        let currTotal;
        let currAvg;
        if (prevMovieRating) {
          currTotal = prevTotal;
          currAvg =
            (prevTotal * movie.avgRating - prevMovieRating + movieRating) /
            currTotal;
        } else {
          currTotal = prevTotal + 1;
          currAvg = (prevTotal * movie.avgRating + movieRating) / currTotal;
        }
        await Movie.findOneAndUpdate(
          { movieId: movieId },
          { $set: { avgRating: currAvg, totalVotes: currTotal } }
        );
        return res.json(comment);
      }

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
