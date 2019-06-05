const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

//@todo: Put wishList array

//@todo: Put likedMovies array

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
          .json({ errors: [{ msg: "User already exists" }] });
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

module.exports = router;
