const express = require("express");
const router = express.Router();
const Sneaker = require('../models/Sneaker.js');
const Tag = require('../models/Tag.js');
const User = require('../models/User.js');
const uploadCloud = require('../config/cloudinary.js');





router.get("/", (req, res) => {
  res.render("index")
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
