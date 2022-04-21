import React, { useState } from "react";
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import RecipeCartContainer from "../RecipeCartContainer/RecipeCartContainer";
import './RecipeControls.css';

const RecipeControls = (props) => {
    return (
        <div className="recipeControls">
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