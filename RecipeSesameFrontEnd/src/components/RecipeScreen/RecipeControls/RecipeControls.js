import React, { useState } from "react";
import RecipeButton from "../RecipeButton/RecipeButton";
import RecipeCartContainer from "../RecipeCartContainer/RecipeCartContainer";
import './RecipeControls.css';

const RecipeControls = (props) => {
    return (
        <div className="recipeControls">
            <img src={process.env.PUBLIC_URL + "/images/"  + props.recipe.Image_Name + ".jpg"} alt={props.recipe.Title} />
            <RecipeCartContainer savedIngredients={props.savedIngredients}/>
        </div>
    );
}

export default RecipeControls;