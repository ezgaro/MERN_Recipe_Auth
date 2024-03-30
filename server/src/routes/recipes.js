import express from 'express';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/',verifyToken ,async (req, res) => {
  const recipe = new RecipeModel(req.body); // Create a new instance of the RecipeModel
  try {
    const response = recipe.save(); // Save the recipe to the database
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/', verifyToken ,async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    const response = recipe.save(); // Save the recipe to the database
    res.json({savedRecipes: user.savedRecipes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/savedRecipes/ids/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({savedRecipes: user.savedRecipes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/savedRecipes/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}}); // Find all recipes that have an id in the user's savedRecipes array
    res.json({savedRecipes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {router as recipesRouter};