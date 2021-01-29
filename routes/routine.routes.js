const express = require('express');
const router  = express.Router();

const Routine = require ('../models/Routine.model');
const Exercise = require ('../models/Exercise.model');

//GET FORM 
router.get("/routine/new", (req, res, next) => {
Exercise.find()
    .then(findExercises=> {
        res.render("routine-views/routine-form", {findExercises})})
    .catch(err=>console.log(`Error while trying to find exercise from DB: ${err}`))
});





module.exports = router;