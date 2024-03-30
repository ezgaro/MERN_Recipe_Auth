import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {

  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

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

  const onSubmit =async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: {
          authorization: cookies.access_token,
        },
      });
      alert("Recipe created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type="text" name="ingredients" value={ingredient}  onChange={(event) => handleIngredientChange(event, index)}/>
        ))}
        <button onClick={addIngredient} type="button" >Add Ingredient </button>
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