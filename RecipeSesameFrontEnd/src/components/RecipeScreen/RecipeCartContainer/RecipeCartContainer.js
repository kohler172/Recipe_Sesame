import React from "react";
import RecipeCartContents from "../RecipeCartContents/RecipeCartContents";
import './RecipeCartContainer.css';

const RecipeCartContainer = (props) => {
    return (
        <div className="recipeCart">
            <h2>Your Ingredients</h2>
            <RecipeCartContents savedIngredients={props.savedIngredients}/>
        </div>
    );
}

export default RecipeCartContainer;