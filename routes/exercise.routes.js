const express = require("express");

const exerciseRouter = express.Router();

const Exercise = require("../models/Exercise.model");
const User = require("../models/User.model");
const routeGuard = require(`../configs/route-guard.config`);

exerciseRouter.get("/exercise/new", routeGuard , (req, res, next) => {
  // views/celebrities/new-celebrity.hbs => physical path to the file
  // in res.render() we never have '/'
  res.render("exercise/new-exercise");
});

// create a post route to pick up all the information from the form to create a new celebrity
{
  /* <form action="/celebrities" method="POST" > */
}

exerciseRouter.post("/exercise/create", (req, res, next) => {
  const { exerciseName, targetedBodyPart, howToDoIt, exerciseImg } = req.body;

  Exercise.create({exerciseName, targetedBodyPart, howToDoIt, exerciseImg, userid: req.session.currentUser._id})
    .then((newExercise) => {
      console.log(newExercise);
      res.redirect("/exercise");
    })
    .catch((err) => console.log("Err while creating new exercise: ", err));
});

exerciseRouter.get("/exercise", routeGuard , (req, res, next) => {
  
  Exercise.find({userid: req.session.currentUser._id})
    .then((allExercises) => {
      res.render("exercise/exercise", { allExercises});
    })
    .catch((err) => console.log("Err while getting all exercises: ", err));

});
// edit
exerciseRouter.get("/exercise/:id/edit", routeGuard, (req, res, next) => {
  
  Exercise.findById(req.params.id)
    .then((foundExercise) => {
      console.log(foundExercise);
      res.render(`exercise/edit-exercise`, {foundExercise});
    })
    .catch((err) => {
      console.log(`error finding exercise by id due to ${err}`);
    });
});

exerciseRouter.post("/exercise/:id/edit", (req, res, next) => {
  Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedExercise) => {
      res.redirect(`/exercise`);
    })
    .catch((err) => {
      console.log(`error updating exercise due to ${err}`);
    });
});

//Delete
exerciseRouter.post("/exercise/:id/delete", (req, res, next) => {
  Exercise.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/exercise");
    })
    .catch((err) => console.log("Error while deleting an exercise: ", err));
});

exerciseRouter.get("/exercise/:id", routeGuard, (req, res, next) => {
  Exercise.findById(req.params.id).then((exerciseDetails) => {
    res.render("exercise/details-exercise", { exerciseDetails });
  });
});

module.exports = exerciseRouter;
