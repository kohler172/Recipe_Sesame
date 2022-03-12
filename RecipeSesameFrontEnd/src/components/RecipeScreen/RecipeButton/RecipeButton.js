import React from "react";
import './RecipeButton.css';

const RecipeButton = (props) => {
    const saveRecipe = () => {
        let currentRecipes = props.savedRecipes.slice();
        currentRecipes.push(props.recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(currentRecipes));
        props.setSavedRecipes(currentRecipes);
    }

    const removeRecipe = () => {
        let currentRecipes = props.savedRecipes.slice();

        const indexOfRec = currentRecipes.indexOf(props.recipe);
        if (indexOfRec !== -1) currentRecipes.splice(indexOfRec, 1);

        localStorage.setItem('savedRecipes', JSON.stringify(currentRecipes));
        props.setSavedRecipes(currentRecipes);
    }

    const handleButtonClick = () => {
        if (props.type === 'add') {
            let currentIngredients = props.savedIngredients.slice();
            const newIngredientList = [...currentIngredients, ...JSON.parse(props.recipe.Cleaned_Ingredients.replace(/"/g, ' inch').replace(/'/g, '"'))];
            props.setSavedIngredients(newIngredientList);
            localStorage.setItem('savedIngredients', JSON.stringify(newIngredientList));
            if (!props.recipeSaved) saveRecipe();
            props.setRecipeSaved(true);
        } else if (props.type === 'save') {
            if (!props.recipeSaved) saveRecipe();
            else if (props.savedRecipes.length > 0) removeRecipe();
            props.setRecipeSaved(!props.recipeSaved);
        }
    }

    return (
        // Ternary is here so we can force save button to be certain width
        props.type === 'add' ? (
            <div className="recipeButton" onClick={handleButtonClick}>
                <p>{props.label}</p>
            </div>
        ) : (
            <div className="recipeButton saveBtn" onClick={handleButtonClick}>
                <p>{props.label}</p>
            </div>
        )
    );
}

export default RecipeButton;