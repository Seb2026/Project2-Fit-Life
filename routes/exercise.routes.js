const express = require("express");

const exerciseRouter = express.Router();

const Exercise = require("../models/Exercise.model");


exerciseRouter.get("/exercise/new", (req, res, next) => {
  // views/celebrities/new-celebrity.hbs => physical path to the file
  // in res.render() we never have '/'
  res.render("exercise/new-exercise");
});

// create a post route to pick up all the information from the form to create a new celebrity
{
  /* <form action="/celebrities" method="POST" > */
}

exerciseRouter.post("/exercise/create", (req, res, next) => {
 

  Exercise.create(req.body)
    .then((newExercise) => {
     console.log(newExercise)
      res.redirect("/exercise");
    })
    .catch((err) => console.log("Err while creating new exercise: ", err));
});


exerciseRouter.get("/exercise", (req, res, next) => {
  Exercise.find()
    .then((allExercises) => {
      
      res.render("exercise/exercise", { allExercises });
    })
    .catch((err) => console.log("Err while getting all exercises: ", err));
});

module.exports = exerciseRouter;