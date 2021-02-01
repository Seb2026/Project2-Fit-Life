const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require(`../models/User.model`);

const routeGuard = require(`../configs/route-guard.config`);



router.get(`/profile`, routeGuard, (req, res, next) => {
    res.render(`user-views/profile`);
});

router.post(`/update-weight`, (req, res, next) => {
    // console.log('check')
    let { isWeightSame, weight } = req.body;
    // console.log('-----> weight:  ', weight);
    // console.log('-----> isWeightSame:  ', isWeightSame);
    // console.log('-----> user in sess:  ', req.session.currentUser);

    if (isWeightSame){
        weight = req.session.currentUser.weight;
        console.log(`2nd attempt :`, weight);
    }
    User.findByIdAndUpdate(req.session.currentUser._id, { weight }, { new: true })
    .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        res.redirect(`/profile`);
    })
    .catch(error => {
        console.log(`error updating weight due to: ${error}`);
    });
});

router.get(`/update-weight`, (req,res,next) => {
    res.render(`user-views/update-weight`);
});



module.exports = router;
