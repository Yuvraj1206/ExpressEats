const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ImYuvraj";

//Sign Up
router.post(
  "/createuser",

  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password", "minimum length for password is 5").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create(
        // name: "Yuvraj saha",
        // email: "yuvraj@gmail.com",
        // password: "123445",
        // location: "iusgiuedj",
        {
          name: req.body.name,
          email: req.body.email,
          password: securedPassword,
          location: req.body.location,
        }
      );
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Log In
router.post(
  "/loginuser",
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password", "Incorrect Password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Incorrect username?passpowrd" });
      }
      const compareDat = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!compareDat) {
        return res.status(400).json({ errors: "Incorrect username?passpowrd" });
      }

      //using jwt
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
