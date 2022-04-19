import React, { useState } from "react";
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import RecipeCartContainer from "../RecipeCartContainer/RecipeCartContainer";
import './RecipeControls.css';

const RecipeControls = (props) => {
    return (
        <div className="recipeControls">
            <img src={process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg"} alt={props.recipe.Title} />
            { JSON.parse(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"')).map(line => <p className="mobileIngredient">{line}</p>) }
            <div className="mobileInstructions">
                { props.recipe.Instructions.split('\n').map(line => <p className="recipeInstructions">{line}</p>) }
            </div>
            <RecipeButtons 
                setRecipeSaved={props.setRecipeSaved}
                recipe={props.recipe}
                ingredients={props.ingredients}
                setIngredients={props.setIngredients}
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