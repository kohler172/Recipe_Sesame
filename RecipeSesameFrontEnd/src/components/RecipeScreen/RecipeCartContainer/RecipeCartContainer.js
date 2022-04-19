import React from "react";
import RecipeCartContents from "../RecipeCartContents/RecipeCartContents";
import './RecipeCartContainer.css';

const RecipeCartContainer = (props) => {
    return (
        <div className="recipeCart">
            <RecipeCartContents savedIngredients={props.savedIngredients}/>
        </div>
    );
}

export default RecipeCartContainer;