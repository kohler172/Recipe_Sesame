import React, { useState } from "react";
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import RecipeCartContainer from "../RecipeCartContainer/RecipeCartContainer";
import './RecipeControls.css';

const RecipeControls = (props) => {
    return (
        <div className="recipeControls">
            <img src={process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg"} alt={props.recipe.Title} />
            <h2>Your Ingredients</h2>
            <RecipeCartContainer savedIngredients={props.savedIngredients}/>
            <RecipeButtons 
                setRecipeSaved={props.setRecipeSaved}
                recipe={props.recipe}
                recipeSaved={props.recipeSaved}
                savedRecipes={props.savedRecipes}
                setSavedRecipes={props.setSavedRecipes}
                savedIngredients={props.savedIngredients}
                setSavedIngredients={props.setSavedIngredients}
            />
        </div>
    );
}

export default RecipeControls;