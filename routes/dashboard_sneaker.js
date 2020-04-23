const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require('../models/Sneaker');
const Tag = require('../models/Tag');


router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/login");
    }
});

router.get("/products_add", (req, res, next) => {
    res.render("products_add");
});

router.get("/products_manage", (req, res, next) => {
    res.render("products_manage");
});


module.exports = router;