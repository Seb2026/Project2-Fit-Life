const express = require('express');
const RoutineModel = require('../models/Routine.model');
const router  = express.Router();

const Routine = require ('../models/Routine.model');
//const Exercise = require ('../models/Exercise.model');

//GET FORM 
router.get("/routine/new", (req, res, next) => {
res.render("routine-views/routine-form")
});





module.exports = router;