const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();


//random recepie on nutrition page
router.get('/nutrition', (req, res, next) => {
  axios
  .get (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.KEY_API3}&number=1`)
  .then(randomRecepie=>{
    const recipe = randomRecepie.data;
    console.log(`random recepie----> ${recipe}`)
    res.render("nutrition-views/nutrition", {recipe})
  })
  .catch(error=> {
    console.log(`error while searching by random recepie ${error}`)
  });
  });


//find by carbs
router.get('/carbs-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&minCarbs=${req.query.minCarbs}&maxCarbs=${req.query.maxCarbs}&number=${req.query.numOfRecepies}`)
    .then(carbSearch=>{
      const carbs = carbSearch.data;
      console.log(`this is carbs query ${carbs}`)
      res.render("nutrition-views/findByNutrients", {carbs})
    })
    .catch(error=> {
      console.log(`error while searching by carbs ${error}`)
    });
  });

//by protein
  router.get('/protein-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&minProtein=${req.query.minProtein}&maxProtein=${req.query.maxProtein}&number=${req.query.numOfRecepies}`)
    .then(proteinSearch=>{
      const proteins = proteinSearch.data;
      console.log(`this is carbs query ${proteins}`)
      res.render("nutrition-views/findByNutrients", {proteins})
    })
    .catch(error=> {
      console.log(`error while searching by proteins ${error}`)
    });
  });


//by calories
  router.get('/calories-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&minCalories=${req.query.minCalories}&maxCalories=${req.query.maxCalories}&number=${req.query.numOfRecepies}`)
    .then(caloriesSearch=>{
      const calory = caloriesSearch.data;
      res.render("nutrition-views/findByNutrients", {calory})
    })
    .catch(error=> {
      console.log(`error while searching by calories ${error}`)
    });
  });

//find by multi nutrients
  router.get('/multi-search', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&maxProtein=${req.query.maxProtein}&maxCalories=${req.query.maxCalories}&maxCarbs=${req.query.maxCarbs}&number=${req.query.numOfRecepies}`)
    .then(multiSearch=>{
      const multiNutrients = multiSearch.data;
      console.log(`this is carbs query ${multiNutrients}`)
      res.render("nutrition-views/findByNutrients", {multiNutrients})
    })
    .catch(error=> {
      console.log(`error while searching by proteins ${error}`)
    });
  });


//find by ingredients
router.get('/ingredients-search', (req, res, next) => {

    let allIngredients = req.query.ingredients.split(',').join(',+');
    console.log(`New variable for ingredients ---> ${allIngredients}`)
    
      axios
      .get (`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.KEY_API3}&ingredients=${allIngredients}&number=${req.query.numOfRecepies}`)
      .then(ingredientsSearch=>{
        const ingredients = ingredientsSearch.data;
        console.log(ingredients)
        res.render("nutrition-views/findByNutrients", {ingredients})
      })
      .catch(error=> {
        console.log(`error while searching by ingredients ${error}`)
      });
    });


/// find by name of food
router.get('/foodname-search', (req, res, next) => {

  axios
  .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&query=${req.query.foodName}&number=${req.query.numOfRecepies}`)
  .then(foodSerach=>{
    const food = foodSerach.data;
    res.render("nutrition-views/findByNutrients", {food})
  })
  .catch(error=> {
    console.log(`error while searching by calories ${error}`)
  });
});

//combined calories and food
router.get('/foodcalorie-search', (req, res, next) => {

  axios
  .get (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.KEY_API3}&query=${req.query.foodName}&maxCalories=${req.query.calories}&number=${req.query.numOfRecepies}`)
  .then(foodSerach=>{
    const caloriesAndFood = foodSerach.data;
    res.render("nutrition-views/findByNutrients", {caloriesAndFood})
  })
  .catch(error=> {
    console.log(`error while searching by calories ${error}`)
  });
});







//details for each recepie
router.get('/recepies/:id', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.KEY_API3}`)
    .then(recepieDetail=>{
      const recepie = recepieDetail.data;
      console.log(recepie)
      res.render("nutrition-views/details", {recepie})
    })
    .catch(error=> {
      console.log(`error while getting details for recepie  ${error}`)
    });
  
  });

  router.get('/recepies/:id/ingredients', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.KEY_API3}`)
    .then(recepieDetail=>{
      const recepie = recepieDetail.data;
      console.log(recepie)
      res.render("nutrition-views/ingredients", {recepie})
    })
    .catch(error=> {
      console.log(`error while getting details for recepie  ${error}`)
    });
  
  });

  router.get('/recepies/:id/instructions', (req, res, next) => {
    axios
    .get (`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.KEY_API3}`)
    .then(recepieDetail=>{
      const recepie = recepieDetail.data;
      console.log(recepie)
      res.render("nutrition-views/instructions", {recepie})
    })
    .catch(error=> {
      console.log(`error while getting details for recepie  ${error}`)
    });
  
  });




  module.exports = router;
