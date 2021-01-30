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

//POST TO SAVE ROUTINE
router.post("/routine/create", (req, res, next)=>{

    const {name, typeOfTraining, exercises, intensity, amountOfWeight, numberOfSets, 
        numberOfReps, additionalEquipment, timeInBetweenSets, created} = req.body;

    Routine.create(req.body)
        .then(createdRoutine=>{
            console.log(createdRoutine);
            res.redirect('/routine')
        })
        .catch(err => console.log(`Error while creating new routine: ${err}`))
})

//GET TO DISPLAY ALL ROUTINES:
router.get('/routine', (req, res, next) => {
    Routine.find()
    .then(allRoutinesFromDB => {
        res.render('routine-views/routine-list', { allRoutinesFromDB })
    })
    .catch(err=> console.log(`Error while displaying routines: ${err}`))

  });

//POST TO DELETE

router.post('/routine/:id/delete', (req, res, next)=>{
    Routine.findByIdAndRemove(req.params.id)
    .then(()=> {
        res.redirect('/routine')
    })
    .catch(err=>console.log(`Error while removing routine from DB: ${err}`))
});


//GET TO EDIT 
router.get("/movies/:id/edit", (req, res, next)=>{
    
    Routine.findById(req.params.id)
    .populate("exercises")
    .then(foundRoutine => {
     

      Exercise.find()
      .then((allExercises) => { 
        allExercises.forEach(oneExercise => {
            foundRoutine.exercises.forEach(exercise => {
              if(oneExercise.id.equals(exercise.id)){
                oneExercise.isInRoutine=true;
              }
          })
        })
          res.render('routine-views/routine-edit', { foundRoutine, allExercises});
      });
    })
    .catch(err => console.log(`Something went wrong while finding movie to edit ${err}`))
});



// //POST TO EDIT
// router.post('/routine/:id/edit', (req, res, next) =>{

//     const {name, typeOfTraining, exercises, intensity, amountOfWeight, numberOfSets, 
//         numberOfReps, additionalEquipment, timeInBetweenSets, created} = req.body;

//     Exercise.findByIdAndUpdate(req.params.id, {name, typeOfTraining, exercises, intensity, amountOfWeight, numberOfSets, 
//         numberOfReps, additionalEquipment, timeInBetweenSets, created}, {new: true})
//     .then(editedRoutine => {
//         console.log(editedRoutine);
//         res.redirect(`/routine/${editedRoutine.id}`)

//     })
//     .catch(err => `Error occurred while saving updated movie ${err}`)
// });






  //GET TO DISPLAY DETAILS OF EACH ROUTINE
router.get("/routine/:id", (req, res, next)=>{
    Routine.findById(req.params.id)
    .populate('exercises')
    .then(routineDetails => {
        console.log(`routine details${routineDetails}`)
        res.render("routine-views/routine-details", {routineDetails})
    })
    .catch(err=>console.log(`Some error while getting routine details ${err}`))
})



module.exports = router;