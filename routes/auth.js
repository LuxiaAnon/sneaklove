const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')

const bcryptSalt = 10;

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post('/signup', (req, res, next) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findOne({
            'email': email
        })

        .then((dbResult) => {
            if (dbResult !== null) {
                res.render('signup', {
                    errorMessage: 'Account already exist...'
                });
                return
            }

            if (name === '' || lastname === '' || email === '' || password === '') {
                res.render('signup', {
                    errorMessage: 'Fill all the fields...'
                });
                return
            }



            User.create({
                    name,
                    lastname,
                    email,
                    password: hashPass,
                })

                .then(() => {
                    res.redirect('/')
                })

                .catch((err) => {
                    console.log(err)
                })

        })

        .catch((error) => {
            next(error)
        })

});

router.get("/signin", (req, res) => {
    res.render("signin");
})

router.post('/signin', (req, res, next) => {

    const theEmail = req.body.email;
    const thePassword = req.body.password;

    if (theEmail === '' || thePassword === '') {
        res.render('signin', {
            errorMessage: 'Fill all the fields...'
        });
        return
    }

    User.findOne({
            'email': theEmail
        })

        .then((dbResult) => {


            if (!dbResult) {
                res.render('signin', {
                    errorMessage: 'Bad account...'
                });
                return
            }



            if (bcrypt.compareSync(thePassword, dbResult.password)) {
                req.session.currentUser = dbResult
                res.redirect('/')
            } else {
                res.render('signin', {
                    errorMessage: 'Bad account...'
                })
            }
        })

        .catch((error) => {
            next(error)
        })

})



router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})



module.exports = router;