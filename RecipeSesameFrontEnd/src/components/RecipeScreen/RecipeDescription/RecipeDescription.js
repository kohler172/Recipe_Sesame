import React from "react";
import './RecipeDescription.css';

const RecipeDescription = (props) => {
    return (
        <div className="recipeDescription">
            { JSON.parse(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"')).map(line => <p>{line}</p>) }
            <div className="instructions">
                { props.recipe.Instructions.split('\n').map(line => <p className="recipeInstructions">{line}</p>) }
            </div>
        </div>
    );
}

export default RecipeDescription;