const express = require(`express`);
const router = express.Router();

const mongoose = require(`mongoose`);

const bcryptjs = require(`bcryptjs`);

const User = require(`../models/User.model`);

const saltRounds = 10;

//create route to render signup hbs page that has form to sign up
router.get(`/signup`, (req, res, next) => {
    res.render(`auth/signup`);
});

//creating user in our database using info from form and hashing password
router.post(`/signup`, (req,res,next) => {
    const { username, email, userPass } = req.body;

    bcryptjs
    .genSalt(saltRounds) // <--- 10 rounds , variable created above
    .then((salt) => bcryptjs.hash(userPass, salt)) // hashing password after creating salt
    .then((hashedPass) => {
        console.log(hashedPass)
        return User.create({ username, email, password: hashedPass })
    })
    .then((fitUser) => {
        res.redirect(`/`); // <--- redirecting to homepage for now will modify later to profile page 
    })
    .catch((err) => {    // <--- error messages that are sent to signup page if an error occurs 
        if (err.code === 11000) {
            res.render(`auth/signup`, { errorMessage: `Username has already been used`});
        } else if (err instanceof mongoose.Error.ValidationError) {
            res.render(`auth/sign-up` , { errorMessage: err.message });
        } else {
            console.log(`error creating a user due to ${err}`);
        }
    });

});

router.get(`/login`, (req, res, next) => { // rendering to login form
    res.render(`auth/login`);
});

router.post(`/login`, (req, res, next) => {
    const { username, password } = req.body;

    if (username === `` || password === ``) { // if user does not enter anything render back to login page with error message
        res.render(`auth/login`, { errorMessage: `Please enter Username and Password` });
        return;
    }

    User.findOne({ username }) // once user logs in find user in db with username
    .then(foundUser => {
        if (!foundUser) { // if username is not in db render back to login with error message
            res.render(`auth/login`, { errorMessage: `No user was found. Try again`});
            return;
        } else if (bcryptjs.compareSync(password, foundUser.password)) { // if hashed password is correct to hashed password in db
            res.redirect(`/`);
        } else {
            res.render(`auth/login`, { errorMessage: `Password is incorrect. Try again.`}); // means password is wrong so rendering back with error message
        }
    })
    .catch(err => {
        console.log(`Error logging in due to: ${err}`);
    });
    
});








module.exports = router;