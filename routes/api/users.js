const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("birthday", "Birthday is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, birthday, password } = req.body;

    try {
      let currDate = new Date();
      let enteredDate = new Date(birthday);
      if (currDate.getTime() < enteredDate.getTime()) {
        return res.status(400).json({
          errors: [{ msg: "Birthday must before today" }]
        });
      }

      let user = await User.findOne({ username });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already exists" }] });
      }

      const wishList = [];
      const likedMovies = [];

      user = new User({
        username,
        birthday,
        password,
        wishList,
        likedMovies
      });

      user.birthday = enteredDate;

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT api/users/likedmovies/:movie_id
// @desc     Add a movie to watch later
// @access   Private
router.put("/likedmovies/:movieid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if a movie has already been added by current user
    if (
      user.likedMovies.filter(item => item.movieId === req.params.movieid)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "Movie already added to watch later" });
    }

    user.likedMovies.unshift({ movieId: req.params.movieid });
    await user.save();

    res.json(user.likedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/watchlater/:movieid
// @desc     Delete a movie from watch later
// @access   Private
router.put("/watchlater/remove/:movieid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if a movie has already been added by current user
    if (
      user.likedMovies.filter(item => item.movieId === req.params.movieid)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Movie hasn't been added to watch later" });
    }
    const removeIndex = user.likedMovies.indexOf(req.params.movieid);
    user.likedMovies.splice(removeIndex, 1);
    await user.save();

    res.json(user.likedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/likedmovies/:movie_id
// @desc     Add a movie to watch later
// @access   Private
router.put("/likedmovies/:movieid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if a movie has already been added by current user
    if (
      user.likedMovies.filter(item => item.movieId === req.params.movieid)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "Movie already added to liked movies" });
    }

    user.likedMovies.unshift({ movieId: req.params.movieid });
    await user.save();

    res.json(user.likedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/likedmovies/:movieid
// @desc     Delete a movie from watch later
// @access   Private
router.put("/likedmovies/remove/:movieid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check if a movie has already been added by current user
    if (
      user.likedMovies.filter(item => item.movieId === req.params.movieid)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Movie hasn't been added to liked movies" });
    }
    const removeIndex = user.likedMovies.indexOf(req.params.movieid);
    user.likedMovies.splice(removeIndex, 1);
    await user.save();

    res.json(user.likedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
