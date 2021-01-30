const express = require("express");

const exerciseRouter = express.Router();

const Exercise = require("../models/Exercise.model");


celebrityRouter.get("/new", (req, res, next) => {
  // views/celebrities/new-celebrity.hbs => physical path to the file
  // in res.render() we never have '/'
  res.render("exercise/new-exercise");
});

// create a post route to pick up all the information from the form to create a new celebrity
{
  /* <form action="/celebrities" method="POST" > */
}

exerciseRouter.post("/", (req, res, next) => {
 

  Exercise.create(req.body)
    .then((newExercise) => {
     
      res.redirect("/exercises");
    })
    .catch((err) => console.log("Err while creating new exercise: ", err));
});


exerciseRouter.get("/", (req, res, next) => {
  Exercise.find()
    .then((allExercises) => {
      
      res.render("exercises/exercise", { allExercises });
    })
    .catch((err) => console.log("Err while getting all exercises: ", err));
});

module.exports = exerciseRouter;