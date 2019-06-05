const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const auth = require("../../middleware/auth");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const MovieRating = require("../../models/MovieRating");

// @route    GET api/comments
// @desc     GET all comments
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/comments/me
// @desc     GET current user's comment
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({ user: req.user.id });
    if (!comment) {
      return res.status(400).json({ msg: "User comment not found" });
    }
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
      let movie = await MovieRating.findOne({ movieId: movieId });
      if (!movie && movieRating) {
        movie = new MovieRating({
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
        await MovieRating.findOneAndUpdate(
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

// @route    DELETE api/comments/:id
// @desc     Delete a comment about a movie
// @access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndRemove({ _id: req.params.id });
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Comment not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/comments/like/:id
// @desc     Like a comment
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Check if the comment has already been liked by current user
    if (
      comment.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Comment already liked" });
    }

    comment.likes.unshift({ user: req.user.id });
    await comment.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/comments/unlike/:id
// @desc     Unlike a comment
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Check if the comment has already been liked by current user
    if (
      comment.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Comment hasn't yet been liked" });
    }

    // Get remove index
    const removeIndex = comment.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    comment.likes.splice(removeIndex, 1);

    await comment.save();

    res.json(comment.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/comments/comment/:id
// @desc     Comment on a comment
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
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

    try {
      const user = await User.findById(req.user.id).select("-password");
      const comment = await Comment.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        username: user.username,
        user: req.user.id
      };

      comment.comments.unshift(newComment);

      await comment.save();

      res.json(comment.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/comments/comment/:id/:comment_id
// @desc     Delete a comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const currComment = await Comment.findById(req.params.id);

    // Pull out comment
    const comment = currComment.comments.find(
      comment => comment.id === req.params.comment_id
    );
    console.log(comment);
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment doesn't exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = currComment.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    currComment.comments.splice(removeIndex, 1);

    await currComment.save();

    res.json(currComment.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
