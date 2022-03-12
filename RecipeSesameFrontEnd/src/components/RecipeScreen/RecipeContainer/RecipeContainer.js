import React, { useState } from "react";
import RecipeDescription from "../RecipeDescription/RecipeDescription";
import RecipeHeader from "../RecipeHeader/RecipeHeader";
import RecipeControls from "../RecipeControls/RecipeControls";
import RecipeButtons from "../RecipeButtons/RecipeButtons";
import './RecipeContainer.css';

const RecipeContainer = (props) => {
    const [recipeSaved, setRecipeSaved] = useState(false);

    const closeRecipeScreen = () => {
        props.setRecipeScreenIsOpen(false);
    }

    return (
        <div className="recipeContainer">
            <div className="recipeMain">
                <div className="shade" onClick={closeRecipeScreen}></div>
                <div className="screenCard recipeCard">
                    <RecipeHeader recipeName={props.openRecipe.Title} closeRecipeScreen={closeRecipeScreen}/>
                    <div className="recipeContent">
                        <RecipeDescription recipe={props.openRecipe} />
                        <RecipeControls 
                            savedIngredients={props.savedIngredients} 
                            recipe={props.openRecipe}
                        />
                    </div>
                    <RecipeButtons 
                        setRecipeSaved={setRecipeSaved}
                        recipe={props.openRecipe}
                        recipeSaved={recipeSaved}
                        savedRecipes={props.savedRecipes}
                        setSavedRecipes={props.setSavedRecipes}
                        savedIngredients={props.savedIngredients}
                        setSavedIngredients={props.setSavedIngredients}
                    />
                </div>
            </div>
        </div>
    );
    
}

export default RecipeContainer;