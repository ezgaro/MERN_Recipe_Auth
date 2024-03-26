import React, { useState } from "react";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleIngredientChange = (e, index) => {
    const {value} = e.target;
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({
      ...recipe,
      ingredients: newIngredients
    });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ""]
    });
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type="text" name="ingredients" value={ingredient}  onChange={(event) => handleIngredientChange(event, index)}/>
        ))}
        <button onClick={addIngredient}>Add Ingredient </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
        <label htmlFor="imageURL">Image</label>
        <input type="text" id="imageURL" name="imageURL" onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};