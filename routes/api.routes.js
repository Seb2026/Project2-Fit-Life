const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/nutrition', (req, res, next) => {
  axios
  .get (`https://api.spoonacular.com/recipes/random?apiKey=ea78a6619ab541c4bd2f63c9a56b443f&number=1`)
  .then(randomRecepie=>{
    const recipe = randomRecepie.data;
    console.log(`ranodm recepie----> ${recipe}`)
    res.render("nutrition-views/nutrition", {recipe})
  })
  .catch(error=> {
    console.log(`error while searching by ranodm recepie ${error}`)
  });
  });


//find by nutrients
router.get('/carbs-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=ea78a6619ab541c4bd2f63c9a56b443f&minCarbs=${req.query.minCarbs}&maxCarbs=${req.query.maxCarbs}&number=${req.query.numOfRecepies}`)
    .then(carbSearch=>{
      const carbs = carbSearch.data;
      console.log(`this is carbs query ${carbs}`)
      res.render("nutrition-views/findByNutrients", {carbs})
    })
    .catch(error=> {
      console.log(`error while searching by carbs ${error}`)
    });
  });


  router.get('/protein-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=ea78a6619ab541c4bd2f63c9a56b443f&minCarbs=${req.query.minProtein}&maxCarbs=${req.query.maxProtein}&number=${req.query.numOfRecepies}`)
    .then(proteinSearch=>{
      const proteins = proteinSearch.data;
      console.log(`this is carbs query ${proteins}`)
      res.render("nutrition-views/findByNutrients", {proteins})
    })
    .catch(error=> {
      console.log(`error while searching by proteins ${error}`)
    });
  });

  router.get('/calories-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=ea78a6619ab541c4bd2f63c9a56b443f&minCarbs=${req.query.minCalories}&maxCarbs=${req.query.maxCalories}&number=${req.query.numOfRecepies}`)
    .then(caloriesSearch=>{
      const calory = caloriesSearch.data;
      res.render("nutrition-views/findByNutrients", {calory})
    })
    .catch(error=> {
      console.log(`error while searching by calories ${error}`)
    });
  });


//find by ingredients
router.get('/ingredients-search', (req, res, next) => {

    let allIngredients = req.query.ingredients.split(',').join(',+');
    console.log(`New variable for ingredients ---> ${allIngredients}`)
    
      axios
      .get (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=ea78a6619ab541c4bd2f63c9a56b443f&ingredients=${allIngredients}&number=${req.query.numOfRecepies}`)
      .then(ingredientsSearch=>{
        const ingredients = ingredientsSearch.data;
        console.log(ingredients)
        res.render("nutrition-views/findByIngredients", {ingredients})
      })
      .catch(error=> {
        console.log(`error while searching by ingredients ${error}`)
      });
    });



//details for each recepie

router.get('/recepies/:id', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=ea78a6619ab541c4bd2f63c9a56b443f`)
    .then(recepieDetail=>{
      const recepie = recepieDetail.data;
      console.log(recepie)
      res.render("nutrition-views/details", {recepie})
    })
    .catch(error=> {
      console.log(`error while getting details for recepie  ${error}`)
    });
  
  });





  module.exports = router;
