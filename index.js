const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
    //created one recipe
    let createdRecipe = {
    title: 'Chocoghetti', 
    level: 'UltraPro Chef', 
    ingredients:['white chocolate', 'spaghetti'], 
    cuisine:'High end', 
    dishType:'main_course',
    duration:20,
    creator:'Victoria Avelar'
    };
    await Recipe.create(createdRecipe);

    let foundRecipe = await Recipe.find({title: 'Chocoghetti'});
    console.log(foundRecipe);

    //inserted the recipes from the data.json file to the DB
    let recepies = data
    await Recipe.insertMany(recepies);

    let allRecipes = await Recipe.find();

    let titles = [];
    for (let i = 0; i < allRecipes.length; i++){
      titles.push(allRecipes[i].title);
    }
    console.log(titles);
    
    //update the recipe
    let updateRecipe = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}
    )
    console.log(updateRecipe);
    console.log('Success Message');
  

    //deleted the recipe
    let deleteRecipe = await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log(deleteRecipe); 

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();


