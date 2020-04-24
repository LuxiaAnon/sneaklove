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

router.post("/products_add", (req, res) => {
    const name = req.body.name;
    const ref = req.body.ref;
    const size = req.body.size;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price
    const id_tags = req.body.id_tags;
    
  
    Sneaker.findOne({
            'ref': ref
        })
        .then((dbResult) => {
            if (dbResult !== null) {
                res.render('products_add', {
                    errorMessage: "Sneaker already exists"
                });
                return
            }
            if (name === '' || ref === '' || size === '' || description === '' || category === '' || price === '') {
                res.render('products_add', {
                    errorMessage: 'Fill all the fields...'
                });
                return
            }

            Sneaker.create({
                    name,
                    ref,
                    size,
                    price,
                    description,
                    category,
                    id_tags
                })
                .then(() => {
                    res.render('products_add', {
                        successMessage: "This shoe is in the DB now"
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            next(err)
        })
})


router.post("/products_add", (req, res,next) => {
    const label = req.body.label;

 Tag.findOne({
         'label': label
     })
     .then((dbResult) => {
         if (dbResult !== null) {
             res.render('products_add', {
                 errorMessage: "label already exists"
             });
             return
         }
         if (label === '' ) {
             res.render('products_add', {
                 errorMessage: 'Fill the field...'
             });
             return
         }

         Tag.create({
                label
             })
             .then(() => {
                 res.render('products_add', {
                     successMessage: "This label is available now"
                 })
             })
             .catch((err) => {
                 console.log(err)
             })
     })
     .catch((err) => {
         next(err)
     })
 })


router.get("/products_manage", (req, res, next) => {
    res.render("products_manage");
});




module.exports = router;