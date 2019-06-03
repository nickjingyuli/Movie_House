const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Movie = require("../../models/Movie");

// @route    POST api/comments
// @desc     Create a comment about a movie
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

    let movie;
    try {
      const currComment = await Comment.findOne({
        user: req.user.id,
        movieId: req.body.movieId
      });
      if (currComment) {
        return res.status(400).json({
          errors: [{ msg: "Each user can only make one comment about a movie" }]
        });
      }

      const user = await User.findById(req.user.id).select("-password");
      const newComment = {
        text: req.body.text,
        movieId: req.body.movieId,
        username: user.username,
        user: req.user.id,
        movieRating: req.body.movieRating
      };

      const comment = new Comment(newComment);

      await comment.save();

      // Update average rating of the movie

      const tmp = await Movie.findOne({ movieId: req.body.movieId });
      if (!tmp && req.body.movieRating) {
        movie = new Movie({
          movieId: req.body.movieId,
          avgRating: req.body.movieRating,
          totalVotes: 1
        });
        await movie.save();
        return res.json(comment);
      }
      if (tmp && req.body.movieRating) {
        const prevTotal = tmp.totalVotes;
        const currTotal = prevTotal + 1;
        const currAvg =
          (prevTotal * tmp.avgRating + req.body.movieRating) / currTotal;
        movie = await Movie.findOneAndUpdate(
          { movieId: req.body.movieId },
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

// @todo: Edit a comment
// @route    PUT api/comments/:id
// @desc     Edit user's own comment about a movie
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

    let movie;
    try {
      const currComment = await Comment.findOne({
        user: req.user.id,
        movieId: req.body.movieId
      });
      if (currComment) {
        return res.status(400).json({
          errors: [{ msg: "Each user can only make one comment about a movie" }]
        });
      }

      const user = await User.findById(req.user.id).select("-password");
      const newComment = {
        text: req.body.text,
        movieId: req.body.movieId,
        username: user.username,
        user: req.user.id,
        movieRating: req.body.movieRating
      };

      const comment = new Comment(newComment);

      await comment.save();

      // Update average rating of the movie

      const tmp = await Movie.findOne({ movieId: req.body.movieId });
      if (!tmp && req.body.movieRating) {
        movie = new Movie({
          movieId: req.body.movieId,
          avgRating: req.body.movieRating,
          totalVotes: 1
        });
        await movie.save();
        return res.json(comment);
      }
      if (tmp && req.body.movieRating) {
        const prevTotal = tmp.totalVotes;
        const currTotal = prevTotal + 1;
        const currAvg =
          (prevTotal * tmp.avgRating + req.body.movieRating) / currTotal;
        movie = await Movie.findOneAndUpdate(
          { movieId: req.body.movieId },
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
