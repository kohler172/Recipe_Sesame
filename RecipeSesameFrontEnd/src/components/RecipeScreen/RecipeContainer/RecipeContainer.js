import React from "react";
import RecipeDescription from "../RecipeDescription/RecipeDescription";
import RecipeHeader from "../RecipeHeader/RecipeHeader";
import RecipeControls from "../RecipeControls/RecipeControls";
import './RecipeContainer.css';

const RecipeContainer = (props) => {
    const closeRecipeScreen = () => {
        props.setRecipeScreenIsOpen(false);
    }

    return (
        <div className="recipeContainer">
            <div className="screenCard recipeCard">
                <RecipeHeader recipeName={props.openRecipe.Title} closeRecipeScreen={closeRecipeScreen}/>
                <div className="recipeContent">
                    <RecipeDescription recipe={props.openRecipe} />
                    <RecipeControls 
                        savedIngredients={props.savedIngredients} 
                        savedRecipes={props.savedRecipes}
                        setSavedIngredients={props.setSavedIngredients} 
                        setSavedRecipes={props.setSavedRecipes} 
                        recipe={props.openRecipe}
                    />
                </div>
            </div>
        </div>
    );
}

export default RecipeContainer;