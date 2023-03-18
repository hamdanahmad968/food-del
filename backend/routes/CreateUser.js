require('dotenv').config()
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.SECRET_KEY

// ------SiGNUP user ------
router.post("/createuser", [ body('email').isEmail(),
body('password').isLength({ min: 5  , errors : "password should be more than 5 char"}),
body('name').isLength({ min: 3 ,  errors : "name should be more than 3 char" })
], async (req, res) => {
  let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
      }
  
  let salt = await bcrypt.genSalt(10);
  let user_password = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      name: req.body.name,
      password: user_password,
      email: req.body.email,
      location: req.body.location,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

// -----LOGIN user-----
router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userdata = await User.findOne({ email });
    if (!userdata) {
      return res.status(400).json({ error: "try logging with correct email" });
    }

    let compare_password = await bcrypt.compare(
      req.body.password,
      userdata.password
    );
    if (!compare_password) {
      return res
        .status(400)
        .json({ errors: "try logging with correct password" });
    }

    const data = {
      user: {
        id: userdata.id,
      },
    };
    const authtoken = jwt.sign(data, jwtsecret);

    return res.status(200).json({ success: true, authtoken: authtoken });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
