import React from "react";
import './RecipeButton.css';

const RecipeButton = (props) => {
    const saveRecipe = () => {
        let currentRecipes = props.savedRecipes.slice();
        currentRecipes.push(props.recipe);
        props.setSavedRecipes(currentRecipes);
    }

    const handleButtonClick = () => {
        if (props.type === 'add') {
            let currentIngredients = props.savedIngredients.slice();
            props.setSavedIngredients([...currentIngredients, ...JSON.parse(props.recipe.Ingredients.replace(/'/g, '"'))]);

            if (!props.recipeSaved) saveRecipe();

            props.setRecipeSaved(true);
        } else if (props.type === 'save') {
            if (!props.recipeSaved) saveRecipe() 
            else {

            }
            props.setRecipeSaved(!props.recipeSaved);
        }
    }

    return (
        <div className="recipeButton" onClick={handleButtonClick}>
            <p>{props.label}</p>
        </div>
    );
}

export default RecipeButton;